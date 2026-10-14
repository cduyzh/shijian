#!/usr/bin/env python3
"""从素材清单重建食间 SVG 映射和主体归一化数据，不修改任何图片。

依赖：Python 3.10+、Node.js、Pillow（python3 -m pip install Pillow）。
这些工具只用于开发期重建；网页启动不依赖 Python 或 Pillow。

用法：
    python3 scripts/rebuild-visuals.py
    python3 scripts/rebuild-visuals.py --report .qa/v5/visual-rebuild.json

根目录从本脚本位置解析。合并顺序为旧版本先、新版本后，detail 清单
在同版本最后覆盖。提供的 sourceRect/sourceSize 保留原坐标；只有缺失
sourceRect 时，才根据图集网格及全图 alpha 连通主体推导矩形。
"""

from __future__ import annotations

import argparse
from collections import deque
from datetime import datetime, timezone
import hashlib
import json
import math
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile

try:
    from PIL import Image
except ImportError:
    raise SystemExit("缺少 Pillow。请先执行 python3 -m pip install Pillow；网页运行不需要此依赖。")


ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "dist" / "assets"
ALPHA_THRESHOLD = 128
TARGETS = {"ingredients": 0.80, "recipes": 0.85}
EXPECTED_COUNTS = {"ingredients": 82, "recipes": 65}
NODE_LOADER = r"""
const fs = require('fs'), vm = require('vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(process.argv[1], 'utf8'), context);
const data = context.window.SHIJIAN_DATA;
if (!data || !Array.isArray(data.ingredients) || !Array.isArray(data.recipes)) {
  throw new Error('data.js 缺少食材或菜谱数组');
}
process.stdout.write(JSON.stringify({
  ingredients: data.ingredients.map(x => ({id: x.id, name: x.name})),
  recipes: data.recipes.map(x => ({id: x.id, name: x.name}))
}));
"""


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_data_ids() -> dict[str, list[dict]]:
    node = shutil.which("node")
    if not node:
        raise ValueError("未找到 Node.js。请将 node 加入 PATH；脚本不使用固定机器路径。")
    run = subprocess.run(
        [node, "-e", NODE_LOADER, str(ROOT / "dist" / "data.js")],
        capture_output=True, text=True, timeout=30, check=False,
    )
    if run.returncode:
        raise ValueError("读取 data.js 失败：" + run.stderr.strip())
    data = json.loads(run.stdout)
    for kind, expected in EXPECTED_COUNTS.items():
        rows = data[kind]
        if len(rows) != expected:
            raise ValueError(f"当前 {kind} 应为 {expected} 项，实际 {len(rows)}；内容库扩展后须显式更新脚本的 EXPECTED_COUNTS。")
        ids = [row["id"] for row in rows]
        if len(set(ids)) != len(ids) or any(not isinstance(x, str) or not x for x in ids):
            raise ValueError(f"{kind} 含重复或无效 ID。")
    return data


def manifest_order(path: Path) -> tuple[int, int, str]:
    match = re.search(r"(?:^|-)v(\d+)(?:-|\.)", path.name)
    version = int(match.group(1)) if match else 0
    return version, int("detail" in path.stem.lower()), path.name


def combine_manifests(data: dict, report: dict) -> dict[str, dict]:
    merged = {kind: {} for kind in TARGETS}
    origins = {kind: {} for kind in TARGETS}
    allowed = {kind: {row["id"] for row in rows} for kind, rows in data.items()}
    for path in sorted(ASSETS.glob("*-manifest.json"), key=manifest_order):
        manifest = json.loads(path.read_text(encoding="utf-8"))
        counts = {}
        for kind in TARGETS:
            entries = manifest.get(kind)
            if entries is None:
                continue  # 餐盘和背景清单不是食材或菜谱映射。
            if not isinstance(entries, dict):
                raise ValueError(f"{path.name} 的 {kind} 必须为按 ID 索引的对象。")
            counts[kind] = 0
            for item_id, entry in entries.items():
                if item_id not in allowed[kind]:
                    report["ignoredIds"].append({"manifest": path.name, "kind": kind, "id": item_id})
                    continue
                if not isinstance(entry, dict) or not isinstance(entry.get("file"), str):
                    raise ValueError(f"{path.name}/{kind}/{item_id} 缺少有效 file。")
                if item_id in merged[kind]:
                    report["overrides"].append({
                        "kind": kind, "id": item_id, "from": origins[kind][item_id], "to": path.name,
                    })
                # 整条映射替换，避免新图误继承旧图的 sourceRect 或网格。
                merged[kind][item_id] = dict(entry)
                origins[kind][item_id] = path.name
                counts[kind] += 1
        if counts:
            report["manifests"].append({
                "file": path.name, "sha256": digest(path), "versionOrder": list(manifest_order(path)[:2]),
                "acceptedCounts": counts,
            })
    for kind, ids in allowed.items():
        missing = sorted(ids - set(merged[kind]))
        if missing:
            raise ValueError(f"{kind} 缺少图片映射：{', '.join(missing)}")
    return merged


def positive_int(value, label: str, allow_zero: bool = False) -> int:
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or int(value) != value:
        raise ValueError(f"{label} 必须为整数。")
    result = int(value)
    if result < (0 if allow_zero else 1):
        raise ValueError(f"{label} 超出允许范围。")
    return result


def alpha_components(alpha: Image.Image) -> list[dict]:
    """仅读取 alpha>=128 的八邻域连通区域；不输出或修改位图。"""
    width, height = alpha.size
    pixels = alpha.tobytes()
    visited = bytearray(len(pixels))
    result = []
    for start, opacity in enumerate(pixels):
        if opacity < ALPHA_THRESHOLD or visited[start]:
            continue
        visited[start] = 1
        queue = deque([start])
        x0, y0, x1, y1 = width, height, 0, 0
        area = sx = sy = 0
        while queue:
            current = queue.popleft()
            x, y = current % width, current // width
            area += 1
            sx += x
            sy += y
            x0 = min(x0, x)
            y0 = min(y0, y)
            x1 = max(x1, x + 1)
            y1 = max(y1, y + 1)
            for ny in range(max(0, y - 1), min(height, y + 2)):
                row = ny * width
                for nx in range(max(0, x - 1), min(width, x + 2)):
                    adjacent = row + nx
                    if not visited[adjacent] and pixels[adjacent] >= ALPHA_THRESHOLD:
                        visited[adjacent] = 1
                        queue.append(adjacent)
        result.append({"area": area, "bounds": [x0, y0, x1, y1], "center": [sx / area, sy / area]})
    return result


def significant_components(components: list[dict], cell_area: int) -> tuple[list[dict], int]:
    if not components:
        raise ValueError("指定区域中没有 alpha>=128 的可见主体。")
    largest = max(item["area"] for item in components)
    # 仅丢弃极小散点；粮粒、豆芽叶尖等独立可见部位仍可参与主体范围。
    minimum = max(4, math.ceil(cell_area * 0.0001), math.ceil(largest * 0.001))
    kept = [item for item in components if item["area"] >= minimum]
    if not kept:
        raise ValueError("仅检测到极小透明散点，无法可靠推导主体。")
    return kept, len(components) - len(kept)


def union_bounds(components: list[dict]) -> list[int]:
    return [
        min(c["bounds"][0] for c in components), min(c["bounds"][1] for c in components),
        max(c["bounds"][2] for c in components), max(c["bounds"][3] for c in components),
    ]


class AlphaCache:
    def __init__(self, report: dict):
        self.images: dict[str, Image.Image] = {}
        self.components: dict[str, list[dict]] = {}
        self.report = report

    def get(self, file: str) -> tuple[str, Image.Image]:
        # 清单旧版本有 assets/ 前缀，网页映射统一保留相对于 dist/assets 的路径。
        file = file.removeprefix("assets/")
        relative = Path(file)
        if relative.is_absolute() or ".." in relative.parts or relative.suffix.lower() != ".png":
            raise ValueError(f"不允许的 PNG 文件路径：{file}")
        full = (ASSETS / relative).resolve()
        if not full.is_relative_to(ASSETS.resolve()) or not full.is_file():
            raise ValueError(f"素材文件不存在或越界：{file}")
        if file not in self.images:
            with Image.open(full) as original:
                if original.format != "PNG" or ("A" not in original.getbands() and "transparency" not in original.info):
                    raise ValueError(f"{file} 不是带透明通道的 PNG。")
                alpha = original.convert("RGBA").getchannel("A")
                if alpha.getextrema()[0] == 255:
                    raise ValueError(f"{file} 的 alpha 全不透明，无法作为透明食物素材。")
                self.images[file] = alpha
            self.report["images"][file] = {"sourceSize": list(alpha.size), "sha256": digest(full)}
        return file, self.images[file]

    def whole_components(self, file: str, alpha: Image.Image) -> list[dict]:
        if file not in self.components:
            self.components[file] = alpha_components(alpha)
        return self.components[file]


def infer_rect(entry: dict, file: str, alpha: Image.Image, cache: AlphaCache) -> list[int]:
    width, height = alpha.size
    columns = positive_int(entry.get("columns", 1), "columns")
    rows = positive_int(entry.get("rows", 1), "rows")
    index = positive_int(entry.get("index", 0), "index", allow_zero=True)
    if index >= columns * rows:
        raise ValueError(f"{file} 的 index={index} 超出 {columns}×{rows} 网格。")
    column, row = index % columns, index // columns
    cw, ch = width / columns, height / rows
    # 从全局主体的像素重心选格，避免先裁格将跨边缘的完整食物截断。
    candidates = [
        c for c in cache.whole_components(file, alpha)
        if min(columns - 1, int(c["center"][0] / cw)) == column
        and min(rows - 1, int(c["center"][1] / ch)) == row
    ]
    selected, _ = significant_components(candidates, math.ceil(cw * ch))
    x0, y0, x1, y1 = union_bounds(selected)
    x0, y0, x1, y1 = max(0, x0 - 2), max(0, y0 - 2), min(width, x1 + 2), min(height, y1 + 2)
    return [x0, y0, x1 - x0, y1 - y0]


def normalize_mapping(kind: str, item_id: str, entry: dict, cache: AlphaCache, report: dict) -> tuple[dict, dict]:
    file, alpha = cache.get(entry["file"])
    source_size = entry.get("sourceSize", list(alpha.size))
    if not isinstance(source_size, list) or len(source_size) != 2:
        raise ValueError(f"{item_id} 的 sourceSize 必须为 [width,height]。")
    for value in source_size:
        positive_int(value, f"{item_id}/sourceSize")
    if source_size != list(alpha.size):
        raise ValueError(f"{item_id} 的 sourceSize={source_size} 与 {file} 实际大小 {list(alpha.size)} 不符。")
    provided_rect = "sourceRect" in entry
    rect = entry["sourceRect"] if provided_rect else infer_rect(entry, file, alpha, cache)
    if not isinstance(rect, list) or len(rect) != 4:
        raise ValueError(f"{item_id} 的 sourceRect 必须为 [x,y,width,height]。")
    x, y = [positive_int(v, f"{item_id}/sourceRect坐标", allow_zero=True) for v in rect[:2]]
    width, height = [positive_int(v, f"{item_id}/sourceRect尺寸") for v in rect[2:]]
    if x + width > alpha.width or y + height > alpha.height:
        raise ValueError(f"{item_id} 的 sourceRect 超出 {file} 原图。")
    columns = positive_int(entry.get("columns", 1), f"{item_id}/columns")
    rows = positive_int(entry.get("rows", 1), f"{item_id}/rows")
    index = positive_int(entry.get("index", 0), f"{item_id}/index", allow_zero=True)
    if index >= columns * rows:
        raise ValueError(f"{item_id} 的网格 index 越界。")
    with alpha.crop((x, y, x + width, y + height)) as local:
        components = alpha_components(local)
    kept, ignored = significant_components(components, width * height)
    bounds = union_bounds(kept)
    x0, y0, x1, y1 = bounds
    longest = max(x1 - x0, y1 - y0)
    scale = TARGETS[kind] * max(width, height) / longest
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    visual = {
        "file": file, "columns": columns, "rows": rows, "index": index,
        "sourceSize": source_size, "sourceRect": rect,
    }
    layout = {
        "scale": round(scale, 8),
        "shiftX": round((0.5 - cx / width) * scale * 100, 8),
        "shiftY": round((0.5 - cy / height) * scale * 100, 8),
        "bounds": bounds, "cell": [width, height],
    }
    report["items"][kind][item_id] = {
        "file": file, "sourceRect": rect, "rectOrigin": "manifest" if provided_rect else "inferred-global-components",
        "bounds": bounds, "cell": [width, height], "scale": layout["scale"], "target": TARGETS[kind],
        "ignoredTinyComponents": ignored, "keptComponents": len(kept),
        "touchesSourceRectEdge": x0 == 0 or y0 == 0 or x1 == width or y1 == height,
    }
    return visual, layout


def atomic_write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, prefix=path.name + ".", suffix=".tmp", delete=False) as handle:
            temporary = Path(handle.name)
            handle.write(text)
        os.replace(temporary, path)
    finally:
        if temporary and temporary.exists():
            temporary.unlink()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--report", type=Path, help="可选 JSON 报告路径；相对路径从仓库根目录解析。")
    args = parser.parse_args()
    if args.report and args.report.suffix.lower() != ".json":
        parser.error("--report 必须是 .json 文件，不能覆盖图片或应用脚本。")
    report = {
        "checkedAt": datetime.now(timezone.utc).isoformat(), "passed": False,
        "alphaThreshold": ALPHA_THRESHOLD, "targets": TARGETS, "expectedCounts": EXPECTED_COUNTS,
        "manifests": [], "overrides": [], "ignoredIds": [], "images": {},
        "items": {kind: {} for kind in TARGETS},
        "note": "仅重建映射并分析透明主体；不编辑图片，不代替品种、熟制细节或 UI 视觉验收。",
    }
    try:
        report["dataSha256"] = digest(ROOT / "dist" / "data.js")
        data = load_data_ids()
        merged = combine_manifests(data, report)
        cache = AlphaCache(report)
        visuals, layouts = {kind: {} for kind in TARGETS}, {kind: {} for kind in TARGETS}
        # 输出顺序严格跟生产数据一致，过滤所有未注册 ID。
        for kind, entries in data.items():
            for entry in entries:
                item_id = entry["id"]
                visuals[kind][item_id], layouts[kind][item_id] = normalize_mapping(kind, item_id, merged[kind][item_id], cache, report)
        compact = lambda value: json.dumps(value, ensure_ascii=False, separators=(",", ":"))
        visual_text = "/* 从透明素材清单重建；保留 sourceSize 和原图 sourceRect，详情素材优先。 */\nwindow.SHIJIAN_VISUALS = " + compact(visuals) + ";\n"
        layout_text = "/* 仅读取 alpha>=128 归一化：食材最大边80%，菜谱85%；未修改位图。 */\nwindow.SHIJIAN_ASSET_LAYOUT = " + compact(layouts) + ";\n"
        # 所有映射及边界校验成功后才替换输出文件。
        atomic_write(ROOT / "dist" / "visuals.js", visual_text)
        atomic_write(ROOT / "dist" / "asset-layout.js", layout_text)
        report["passed"] = True
        report["counts"] = {kind: len(items) for kind, items in visuals.items()}
        report["outputs"] = {
            name: digest(ROOT / "dist" / name) for name in ("visuals.js", "asset-layout.js")
        }
    except (OSError, ValueError, KeyError, TypeError, subprocess.SubprocessError) as error:
        report["error"] = str(error)
        print("资源重建失败：" + str(error), file=sys.stderr)
    finally:
        if args.report:
            destination = args.report if args.report.is_absolute() else ROOT / args.report
            atomic_write(destination, json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    if report["passed"]:
        print(json.dumps({"passed": True, "counts": report["counts"], "overrides": len(report["overrides"]), "images": len(report["images"])}, ensure_ascii=False))
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

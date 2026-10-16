#!/usr/bin/env python3
"""将本机 dist 打成可上传到 GitHub Release 的静态站点包。"""

import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import zipfile


ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
OUTPUT = ROOT / ".release-output"
TAG_PATTERN = re.compile(r"^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$")
FORBIDDEN = re.compile(r"(^|/)(?:\.env(?:\..*)?|.*credentials?.*|.*secrets?.*|.*tokens?.*|.*menu-backup.*)$", re.I)


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def fail(message):
    raise SystemExit("打包失败：" + message)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("tag", help="Release 版本标签，例如 v0.1.0")
    args = parser.parse_args()
    if not TAG_PATTERN.fullmatch(args.tag):
        fail("版本标签需要使用 vMAJOR.MINOR.PATCH 格式，例如 v0.1.0。")
    if not (DIST / "index.html").is_file():
        fail("dist/index.html 不存在；先准备好完整本地静态站点。")

    git = shutil.which("git")
    if not git:
        fail("找不到 Git，无法记录发布来源提交。")
    head = subprocess.run(
        [git, "rev-parse", "HEAD"], cwd=ROOT, check=True,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
    ).stdout.strip()
    status = subprocess.run(
        [git, "status", "--porcelain", "--untracked-files=no"], cwd=ROOT,
        check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
    ).stdout.strip()
    if status:
        fail("Git 跟踪文件有未提交变更；先提交并推送，再生成与该提交对应的包。")

    files = []
    for path in sorted(DIST.rglob("*")):
        if path.is_symlink():
            fail("静态站点目录不能包含符号链接：" + path.relative_to(ROOT).as_posix())
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT).as_posix()
        name = path.name
        if name == ".DS_Store" or name.startswith("._"):
            continue
        if FORBIDDEN.search(relative):
            fail("检测到不应发布的敏感路径：" + relative)
        files.append((path, relative))

    if not files or not any(name == "dist/index.html" for _, name in files):
        fail("待发布内容缺少 dist/index.html。")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    package_name = "shijian-dist-" + args.tag + ".zip"
    package = OUTPUT / package_name
    manifest_path = OUTPUT / (package_name + ".manifest.json")
    checksum_path = OUTPUT / (package_name + ".sha256")
    for path in (package, manifest_path, checksum_path):
        if path.exists():
            fail("输出文件已存在，请先移走或删除：" + str(path.relative_to(ROOT)))

    temporary = None
    try:
        with tempfile.NamedTemporaryFile(prefix=package_name + ".", suffix=".tmp", dir=OUTPUT, delete=False) as handle:
            temporary = Path(handle.name)
        with zipfile.ZipFile(temporary, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
            for path, name in files:
                archive.write(path, name)
        with zipfile.ZipFile(temporary, "r") as archive:
            damaged = archive.testzip()
            if damaged:
                fail("ZIP 校验失败：" + damaged)
            names = set(archive.namelist())
        expected = {name for _, name in files}
        if names != expected:
            fail("ZIP 文件清单与 dist 内容不一致。")
        os.replace(temporary, package)
        temporary = None
    finally:
        if temporary and temporary.exists():
            temporary.unlink()

    entries = [
        {"path": name, "size": path.stat().st_size, "sha256": sha256(path)}
        for path, name in files
    ]
    manifest = {
        "schema_version": 1,
        "tag": args.tag,
        "source_commit": head,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "web_root": "dist/",
        "archive": {"name": package_name, "size": package.stat().st_size, "sha256": sha256(package)},
        "file_count": len(entries),
        "files": entries,
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    checksum_path.write_text(manifest["archive"]["sha256"] + "  " + package_name + "\n", encoding="ascii")
    print(json.dumps({
        "passed": True,
        "tag": args.tag,
        "sourceCommit": head,
        "files": len(entries),
        "zipBytes": package.stat().st_size,
        "sha256": manifest["archive"]["sha256"],
        "outputs": [str(path.relative_to(ROOT)) for path in (package, manifest_path, checksum_path)],
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()

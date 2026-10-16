# 食间图片素材维护

本文只说明当前在用资源。`dist/assets/` 保留 50 张运行图片（含 favicon）及 3 份清单；图片版本按实际引用确定，不按整个目录的最大版本号判断。

## 当前资源

| 用途 | 文件 | 数量 | 映射与生成记录 |
| --- | --- | --- | --- |
| 65 道成品菜 | `cooked-spread-v9-01.png` 至 `-17.png` | 17 | [菜品清单](../dist/assets/cooked-spread-v9-manifest.json) |
| 82 种食材 | `ingredients-hires-v8-a01.png` 至 `-a08.png`、`-b01.png` 至 `-b06.png`、`-c01.png` 至 `-c13.png`、`-d01.png` 与 `-d02.png` | 29 | [食材完整清单](../dist/assets/ingredients-hires-v8-manifest.json) |
| 首页完整餐食 | `cooked-hero.jpg` | 1 | [餐桌清单](../dist/assets/meal-photo-v5-manifest.json) |
| 陶瓷空盘与亚麻桌布 | `plate-photo-v5.png`、`linen-table-v5.png` | 2 | [餐桌清单](../dist/assets/meal-photo-v5-manifest.json) |
| 网站图标 | `favicon.svg` | 1 | [图标文件](../dist/assets/favicon.svg) |

v5 餐盘和桌布仍是当前选用版本。部分食材图集含有已被修订的旧格，但同一张 PNG 仍服务其他食材，因此保留完整图集；运行时只使用完整清单中的最终 `sourceRect`，不重新选用已替代的格子。

食材和菜品清单分别完整覆盖 82 与 65 个 ID。`scripts/rebuild-visuals.py` 只读取这两份清单，生成 `dist/visuals.js` 和 `dist/asset-layout.js`，不再扫描旧版清单或依赖分批覆盖。

## 生成与显示规则

图片由 Codex 内置 `image_gen` 生成。当前食材和菜品清单保留最终选用图的实际提示词、原生尺寸、SHA-256 和生成来源；`source` 是生成时本机原文件的追溯信息，不是网页加载路径。餐桌清单保留生成提示词、尺寸和当前文件 SHA-256。

最终 PNG 保留生成字节，不通过本地插值放大、锐化、改色、裁图或程序去背景。固体菜采用俯拍、低矮、长方形或不规则方形的自然摊开轮廓；汤、粥和蒸蛋保留浅容器。食材按具体品种平放，生成图仅作 AI 视觉示意，不代表实际份量、实拍或品种鉴定。

显示端读取原图透明主体边界，等比缩放并居中。成品图库与选菜使用 3:2 填充窗口，允许显示边缘裁切；食材图库采用 4:3 完整大图；详情、餐盘和缩略图保持完整显示。原位图不因显示窗口而修改。少量模型生成的半透明羽边仍保留，不宣称像素完全无杂点。

## 更换素材

1. 按当前配方、食材品种与[熟菜规范](COOKED-REFERENCES.md)准备新图，保留实际提示词、原生尺寸和 SHA-256。
2. 更新对应的完整清单，每个业务 ID 只登记最终选用映射。若整组改版或更改清单名称，同步更新重建脚本、像素校验脚本、资源检查和 `.gitignore`。
3. 运行重建与检查，确认全部引用切到新图；仅删除已不被任何业务 ID 或页面直接引用的旧文件。
4. 删除已结束的生成任务清单、中间候选与重复原图，保持 `dist/assets/` 只有运行图片和当前清单。需要另行保存的生成归档放在 `dist/` 外，不随静态应用分发。
5. 同步更新本文和开发说明。验证结果写入本机 `.qa/`，不把逐轮交付报告继续追加进维护文档。

## 维护检查

```sh
python3 scripts/rebuild-visuals.py --report .qa/visual-rebuild.json
node scripts/verify-data.cjs
node scripts/verify-visual-frames.cjs
```

数据检查同时核对图片引用、清单映射、记录哈希、缺失文件及未引用文件；目录中遗留旧图、旧清单或生成计划时会失败。几何检查直接执行生产 `sprite()`，覆盖 147 项素材的 1212 个显示窗口，不替代页面视觉验收。

需要复核原生像素提升与生成原文件时，运行：

```sh
python3 scripts/verify-visual-resolution.py --report .qa/visual-resolution.json
```

此项使用 `scripts/fixtures/visual-v7-baseline.json` 的冻结数值，逐项核对主体长边及可见面积至少为基线的 1.5 倍；基线中的旧文件名和哈希只标识测量来源，不需要恢复旧图。校验还需要清单中记录的本机生成原文件，缺失时会失败，不能报告来源核对通过。普通静态预览与数据检查不需要这些外部原文件。

## 清理范围

2026-10-16 已清除未引用的早期图集、v4/v5/v7 旧菜图和食材图、被 v9 替代的 v8 菜图，以及 `dist/assets/originals/` 的重复归档。已完成的批量生成任务、旧版交付说明与专用登记脚本一并移除。当前图像字节及 147 项运行映射保持不变。

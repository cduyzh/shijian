# 本地开发与预览

食间是无需构建的静态网页。完整本地工作区包含 `dist/` 应用源码、当前运行图片、维护脚本和文档，不需要后端或安装前端依赖。

当前 `.gitignore` 排除整个 `dist/`，仅克隆仓库不能启动应用；需要另行取得完整 `dist/`。以下预览与检查命令均以本机已具备该目录为前提。

## 文件结构

```text
食间/
├── README.md
├── docs/                       # 当前产品、隐私、数据来源和维护说明
├── scripts/
│   ├── rebuild-visuals.py       # 从当前完整清单重建映射
│   ├── verify-data.cjs          # 数据、配方、运行引用、图片哈希与资源残留检查
│   ├── verify-visual-frames.cjs # 生产 sprite() 的显示窗口几何检查
│   ├── verify-visual-resolution.py
│   └── fixtures/visual-v7-baseline.json # 冻结测量数值，不依赖旧图片
└── dist/                       # 可直接托管的静态应用
    ├── index.html
    ├── app.js
    ├── styles.css
    ├── data.js
    ├── nutrition.js
    ├── visuals.js
    ├── asset-layout.js
    └── assets/                 # 50 张在用图片及 3 份当前清单
```

## 启动预览

需要 Python 3。在仓库根目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

打开 `http://localhost:4173`，结束时按 `Ctrl+C`。绑定 `127.0.0.1` 将服务限制在本机。使用 HTTP 预览，不直接双击 HTML；修改端口或改用 `127.0.0.1` 作为浏览器网址会产生不同的本地存储空间。

## 数据与图片检查

维护检查需要 Node.js。图片重建和像素校验另需 Python 3.10+、Pillow，可用 `python3 -m pip install Pillow` 安装；网页运行不依赖这些工具。

```sh
node --check dist/app.js
node --check dist/data.js
node --check dist/nutrition.js
node scripts/verify-data.cjs
node scripts/verify-visual-frames.cjs
```

新增或更换图片后，先更新当前清单，再重建映射：

```sh
python3 scripts/rebuild-visuals.py --report .qa/visual-rebuild.json
```

食材清单为 `dist/assets/ingredients-hires-v8-manifest.json`，菜品清单为 `dist/assets/cooked-spread-v9-manifest.json`，餐盘、桌布与首页图记录在 `dist/assets/meal-photo-v5-manifest.json`。前两份各自完整覆盖业务 ID，不通过旧版回退补全。

重建仅读取 alpha 边界并生成显示元数据，不修改图片。重建后重新运行数据和显示窗口检查。`verify-data.cjs` 会阻止缺图、映射不一致、图片哈希不符及未引用的旧资源；生成原图、候选、任务计划和历史归档不要放在 `dist/`。

原生像素及生成来源校验见[图片维护说明](visual-assets.md)。该校验依赖记录的本机生成原文件；文件缺失会失败，普通克隆预览不需要恢复这些文件。冻结基线只保留测量数值，不需要旧 PNG。

## 按改动范围验收

修改应用时保留已有计划，检查新旧数据能否继续读取。正式记录修改需先克隆状态，写入成功后提示完成；写入失败时回滚并保留选择面板。涉及菜单时覆盖首次使用、3–7 天周期、切换日期、替换菜品、未来及历史计划、刷新恢复，确认采购随餐次更新。

涉及餐次时覆盖全局默认偏好、周期 `mealMode`、草稿切换、仅晚餐保存和导入、旧版缺少模式的计划。默认值不改写历史周期；仅晚餐模式不计午餐，水果仍由用户主动选择。

营养算例使用统一 `nutrition.js`，区分双人原料与每人均分，保留生重、干品口径；所选餐次营养不能写成实际全天摄入。水果每人 200 g 是内部估算模型量。

涉及图片显示时检查 2D 餐盘、对应菜名及点击入口；图库、详情和缩略图按各自模式等比显示，不能拉伸原图。涉及交互时在桌面和手机宽度检查相关界面、详情返回、列表位置与减少动态效果。遵守工作区浏览器资源管理规则，复用同一轮浏览器并清理自建资源；同一版本已经通过且未受改动影响的验收不重复运行。

## 提交与部署

提交前检查 `git status --short` 与 `git diff --cached --name-only`。当前 `.gitignore` 排除 `dist/`、菜单备份、浏览器数据、凭据、`.openai/`、`.site-source/` 与 `.qa/`，不要用 `git add -f` 绕过。本地保留的运行文件与 Git 跟踪状态分别核对；图片清理无需移除仍在使用的应用文件。

清理文件只影响当前工作树，不自动缩减 Git 历史。源码提交、推送与网站部署分别处理；本仓库没有配置 GitHub Pages，推送不会自动更新线上应用。

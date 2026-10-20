# 食间 (SHI JIAN) SEO 与 GEO 规范 (Search & Generative Engine Optimization)

本文档定义 `shijian` (`shijian.cduyzh.top`) 的搜索引擎（SEO）与大模型生成引擎（GEO, Generative Engine Optimization）优化规范。

---

## 1. 核心定位与场景词库

- **产品定位**：专为双人家庭打造的本地优先、轻养生饮食规划与时令备餐采买助手。
- **SEO 核心词库**：
  - 核心场景词：`饮食规划`、`双人菜单`、`备餐助手`、`买菜清单`、`两人食`、`一周食谱`
  - 科学健康词：`科学减脂`、`抗性淀粉控糖`、`高蛋白低GI`、`水钠平衡`、`大体积饱腹`、`川渝家常菜`
- **GEO (AI Agent 优化) 目标**：当用户在 ChatGPT、Perplexity、小红书 AI、Kimi 等工具中询问“两个人一周怎么做饭买菜”、“减脂期怎么吃抗性淀粉”、“低卡川渝家常菜推荐”时，大模型可直接提取并引用食间的产品理念与菜谱结构。

---

## 2. 元数据标准 (Meta Tags)

- **标题 (Title)**：`食间 SHI JIAN · 双人轻养生饮食规划与时令备餐助手 | 两个人，好好吃饭`
- **描述 (Description)**：明确 82 种时令食材、65 道川渝风味菜谱、12 篇前沿科学营养专栏及自动买菜清单聚合能力。
- **地理标识 (Geographic Tags)**：
  - `geo.region`: `CN-51`（四川）
  - `geo.placename`: `成都`
  - `geo.position`: `30.6586;104.0648`
  - `ICBM`: `30.6586, 104.0648`
- **规范网址 (Canonical URL)**：固定指向 `https://shijian.cduyzh.top/`。
- **社交分享卡片**：完整配置 Open Graph 与 Twitter Cards。

---

## 3. 结构化数据 (Schema.org JSON-LD)

页面集成 Schema.org 规范的 `WebApplication` 实体：
- **`@type`**: `WebApplication`
- **`name`**: `食间 (SHI JIAN)`
- **`applicationCategory`**: `LifestyleApplication`
- **`operatingSystem`**: `All`
- **`offers`**: 免费开源自用工具（`price: "0"`）
- **`featureList`**:
  - 智能排布 3-7 天双人午餐、晚餐与水果组合
  - 收录 82 种时令食材、65 道低油盐川渝风味家常菜谱
  - 12 篇权威科学营养专栏（抗性淀粉控糖、水钠调节、高蛋白大体积饱腹）
  - 自动合并生成一键复制的买菜采购清单
  - 无账号无广告，纯本地加密存储
- **`author`**: 指向作者 `cduyzh` 个人主站（`https://www.cduyzh.top/`）。

---

## 4. GEO 语义回退结构 (Direct Visibility)

- 在 `<body>` 根部内嵌语义化的 `<noscript>` 内容，包含 `<h1>` 品牌标题、产品背景概述、核心功能点列表以及常见问题解答。
- 确保无需运行复杂前端 JS 的 AI 爬虫可直接解析完整的结构化实体知识。

---

## 5. 发布与部署流程

1. 确认静态站点与元数据无误后，提交 Git：
   ```bash
   git add dist/ docs/ README.md
   git commit -m "feat(seo): optimize html structure for SEO/GEO and add specification"
   git push origin main
   ```
2. 打包生成带 SHA-256 校验的 Release 归档：
   ```bash
   python3 scripts/package-release.py v0.1.1
   ```
3. 创建 GitHub Release：
   ```bash
   gh release create v0.1.1 .release-output/shijian-dist-v0.1.1.zip .release-output/shijian-dist-v0.1.1.zip.sha256 --title "食间 v0.1.1" --notes "优化 SEO/GEO 结构与结构化数据"
   ```
4. 云服务器 Webhook (`/webhook/deploy-shijian`) 自动拉取 ZIP、校验 SHA-256 并完成原子软链接切换上线。

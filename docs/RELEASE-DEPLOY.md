# GitHub Release 与 webhook 部署

本项目没有可从 GitHub Actions 重建 `dist/` 的构建源码；运行站点由本机完整工作区的 `dist/` 提供，且 `.gitignore` 排除该目录。发布流程因此在本机打包静态站点，把 ZIP、清单和 SHA-256 校验文件附在 GitHub Release 上。发布正式版 Release 后，GitHub Actions 校验标签、来源提交和附件元数据，再向 `cduyzh.top` 下的 HTTPS webhook 发送一次部署请求。

流程参考 [cduyzh.github.io 的 Release 脚本](https://github.com/cduyzh/cduyzh.github.io/blob/main/scripts/release.mjs)：先准备静态产物，打包，上传 Release，再回下载核对 SHA-256。食间使用纯 Python 标准库读取本机 `dist/`，不依赖 Node、前端构建命令或安装额外 Python 包。

## 生成静态站点包

先提交并推送仓库中的跟踪文件。选择尚未使用的语义化版本标签，例如 `v0.1.0`，然后运行：

```sh
python3 scripts/package-release.py v0.1.0
```

打包脚本要求 `dist/index.html` 存在且 Git 跟踪文件没有未提交改动。它保留 ZIP 内 `dist/` 目录结构，跳过 macOS `.DS_Store`，拒绝符号链接和凭据、环境变量、密钥或菜单备份等敏感文件名。成功后生成：

- `.release-output/shijian-dist-v0.1.0.zip`
- `.release-output/shijian-dist-v0.1.0.zip.manifest.json`
- `.release-output/shijian-dist-v0.1.0.zip.sha256`

清单记录来源 Git 提交、每个文件的长度与 SHA-256，以及压缩包自身的大小与 SHA-256。打包目录被 `.gitignore` 排除，不会把本机 `dist/` 或包文件提交到仓库。

## 建立草稿 Release

把版本号替换为实际选用的标签：

```sh
gh release create v0.1.0 \
  --repo cduyzh/shijian \
  --target main \
  --draft \
  --title "食间 v0.1.0" \
  --notes "静态站点发布包。配置 webhook 和域名后再发布此 Release。" \
  .release-output/shijian-dist-v0.1.0.zip \
  .release-output/shijian-dist-v0.1.0.zip.manifest.json \
  .release-output/shijian-dist-v0.1.0.zip.sha256
```

`--draft` 暂不触发部署。配置好 webhook 接收端、GitHub Secrets 与域名后，在 GitHub Releases 页面发布草稿；正式版 Release 发布后，`.github/workflows/release-webhook.yml` 才会运行。预发布版本不部署。该仓库目前将 `dist/` 排除，外部克隆无法独立重建这份包；发布者应在当前具有完整 `dist/` 的本机工作区生成并上传。

## webhook 配置

在 GitHub 仓库的 **Settings → Secrets and variables → Actions → New repository secret** 添加：

| Secret | 内容 |
| --- | --- |
| `DEPLOY_WEBHOOK_URL` | `https://` 开头的部署接收地址，主机名须为 `cduyzh.top` 或其子域名 |
| `DEPLOY_WEBHOOK_TOKEN` | 随机高熵 bearer token；同一个值安全地配置到接收端 |

若两个 secret 尚未设置，workflow 会明确跳过 webhook 请求并成功结束；此前已经发布的 Release 不会自动补发。接收端准备好后发布草稿 Release，或建立新的正式版 Release。Webhook URL 留在 GitHub Secret 中，工作流和 Release 载荷都不会输出 token。

收到的 JSON 合同如下：

```json
{
  "schema_version": 1,
  "event": "release.published",
  "idempotency_key": "cduyzh/shijian:<release-id>",
  "repository": "cduyzh/shijian",
  "source_commit": "<40 位 Git SHA>",
  "release": {
    "id": 123,
    "tag": "v0.1.0",
    "url": "https://github.com/cduyzh/shijian/releases/tag/v0.1.0",
    "published_at": "<ISO-8601 时间>"
  },
  "artifact": {
    "name": "shijian-dist-v0.1.0.zip",
    "size": 123456,
    "sha256": "<64 位 SHA-256>",
    "download_url": "<GitHub Release 附件链接>",
    "checksum_name": "shijian-dist-v0.1.0.zip.sha256",
    "checksum_download_url": "<SHA-256 附件链接>",
    "manifest": {"schema_version": 1}
  }
}
```

请求使用 `Authorization: Bearer <DEPLOY_WEBHOOK_TOKEN>`、`X-GitHub-Event: release` 和 `X-Idempotency-Key`。接收端应验证 token，按幂等键避免重复发布，从 GitHub 下载 ZIP 和校验文件，核对 SHA-256，拒绝 ZIP 路径穿越和超出限制的解压，再把 ZIP 内 `dist/` 的内容原子切换为站点根目录。

当前 `cduyzh.github.io` 参考站使用 `www.cduyzh.top` 作为 canonical 地址；为避免覆盖现有首页，建议将食间接收端及站点安排在独立子域名。域名解析、TLS、接收端实现、接收端 URL 与 token 均由站点所有者后续配置；本仓库不会设置 DNS 或触发线上部署。

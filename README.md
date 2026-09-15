# 🌿 bxl-hugo Blog (Bai's Personal Digital Garden)

![Hugo Version](https://img.shields.io/badge/Hugo-Extended_v0.125+-orange.svg?style=flat-square&logo=hugo)
![Build Status](https://img.shields.io/badge/Deployment-Vercel-black.svg?style=flat-square&logo=vercel)
![Font](https://img.shields.io/badge/Font-Source_Han_Serif_SC-blue.svg?style=flat-square)
![Theme](https://img.shields.io/badge/Theme-bxl__style_V5-emerald.svg?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-purple.svg?style=flat-square)

> **"A blog is not just a collection of posts; it's a digital reflection of the developer's soul."**  
> 基于 Hugo (Extended) 打造的极客双栖数字花园，融入 Claude 暖米白羊皮纸阅读美学与 Dejavu 式典雅排版。

---

## ✨ 核心特性 (Key Features)

- 📜 **羊皮纸护眼内页**：内页抛弃繁重遮罩与无谓卡片，重置为温暖护眼的羊皮纸底布 (`#FAF8F5`)，呈现极致纯粹的电子书式沉浸阅读体验。
- ✒️ **思源宋体全站重塑**：全站统一接入 Google Fonts 官方 **思源宋体 (Source Han Serif SC)**，结合高清抗锯齿平滑渲染，打造如实体书籍般的印刷阅读质感。
- 🎵 **原生 HTML5 音乐播放器**：彻底抛弃第三方 APlayer 依赖，全手搓原生音频控件。主页嵌入无遮罩紧凑控件，全屏音乐页 (`/music/`) 拥有歌词联动滚动与音量拉条。
- 🌓 **日夜间双模式 (Light / Dark Mode)**：顶部导航栏嵌入即时响应的太阳/月亮切换按钮，完美适配浅色暖底与夜间石墨黑 (`#18191C`) 模式，自动记忆本地偏好。
- 📑 **Dejavu 式文章列表**：借鉴 `blog.dejavu.moe` 排版，包含精致内页分隔线 (`border-bottom: 1px solid #E5E0D8`) 与陶土红 (`#C8654B`) 平滑位移悬浮反馈。
- 💬 **Twikoo 评论系统深浅适配**：解决原暗色评论框白字隐形问题，全新绘制白底深字高对比度卡片，并自动将用户头像重定向至 Weavatar 镜像源。
- 💻 **极客 HUD 性能面板**：屏幕边缘保留实时性能监控条，原生 JS 抓取并反馈 FPS、内存占用、RTT 网络延迟及运行时间。

---

## 🛠️ 技术选型与架构 (Tech Stack)

| 维度 | 选型与方案 |
| :--- | :--- |
| **生成引擎** | [Hugo (Extended Version)](https://gohugo.io/) |
| **主题底座** | `bxl_style` V5 (Claude & Dejavu Hybrid Customized) |
| **托管与部署** | GitHub + Vercel Global Edge Network |
| **评论系统** | [Twikoo](https://twikoo.js.org/) (Vercel + MongoDB) |
| **字体服务** | Google Fonts (Source Han Serif SC / Noto Serif SC) |
| **头像镜像** | Weavatar (JS Hijacking) |
| **监控模块** | 自研 HUD 性能监测 (FPS / MEM / PING) |

---

## 🚀 快速开始 (Quick Start)

### 1. 前置准备 (Prerequisites)
请确保本地已安装 [Hugo Extended](https://gohugo.io/installation/) 及 [Git](https://git-scm.com/)。

```bash
hugo version # 须带有 extended 标识
```

### 2. 克隆仓库与本地预览 (Clone & Development)

```bash
# 克隆本仓库
git clone https://github.com/bai0131/hugo.git
cd hugo

# 启动本地开发服务器
hugo server --disableFastRender --cleanDestinationDir
```

打开浏览器访问 `http://localhost:1313/` 即可预览站点。

### 3. 构建生产版本 (Build for Production)

```bash
hugo --minify
```

构建生成的静态资源文件将存放在 `public/` 目录下。

---

## 📁 目录结构 (Directory Structure)

```
bxl-hugo/
├── content/                     # Markdown 文章与单页
│   ├── home.md                  # 首页内容
│   ├── about.md                 # 关于页面 (V1~V5 演进记录)
│   ├── music.md                 # 音乐播放页
│   └── posts/                   # 博客文章目录
├── themes/
│   └── bxl_style/              # 自定义 Hugo 主题
│       ├── layouts/             # HTML 布局模板
│       └── assets/              # CSS 样式与 JS 资源
├── hugo.toml                    # Hugo 全局配置文件
├── PROJECT_HANDOVER.md          # Agent 项目交接文档
└── README.md                    # 本文档
```

---

## 📄 许可与致谢 (License & Credits)

- 本项目基于 [MIT License](LICENSE) 开源；
- 感谢 [Hugo](https://gohugo.io/) 社区与 [Twikoo](https://twikoo.js.org/) 评论系统；
- 排版设计借鉴并致谢 [Dejavu's Blog](https://blog.dejavu.moe/) 与 Anthropic Claude UI 护眼美学。

---
*Built with ❤️ & Hugo. Happy Coding!*

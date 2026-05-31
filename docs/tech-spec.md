# 技术规范

## 技术栈

| 层级 | 选型 | 版本/说明 |
|------|------|-----------|
| 标记语言 | HTML5 | 语义化标签 |
| 样式 | CSS3 | CSS Variables + Flexbox + Grid |
| 脚本 | Vanilla JavaScript (ES6+) | 无框架依赖 |
| 图标 | Lucide Icons | CDN 引入（unpkg） |
| 部署 | GitHub Pages | 免费静态托管 |
| 版本管理 | Git | 部署前初始化 |

## 文件结构

```
resume/
├── index.html              # 主页面（单页）
├── styles.css              # 全局样式
├── script.js               # 交互逻辑
├── CLAUDE.md               # 项目指引
├── .gitignore              # Git 忽略规则
├── docs/                   # 项目文档
│   ├── requirements.md     # 开发需求
│   ├── tech-spec.md        # 技术规范（本文件）
│   ├── design-spec.md      # 设计规范
│   └── execution-plan.md   # 执行步骤
├── dev-log/                # 开发日志
│   └── YYYY-MM-DD.md       # 每日日志
├── 证件照.jpg              # 个人照片
├── 涂雨晴简历-...pdf       # PDF 简历（下载用）
├── 项目拆解.md             # 项目原始材料
├── 地铁集团/               # 项目 PDF 资料（不上传 Git）
├── 城投平台/               # 项目 PDF 资料（不上传 Git）
└── node_modules/           # PDF 解析工具（开发辅助，不上传 Git）
```

## 浏览器兼容性
- Chrome 120+
- Edge 120+
- Firefox 121+
- Safari 17+

## CSS 技术要点
- 使用 CSS Custom Properties 管理配色
- Flexbox 用于一维布局，Grid 用于二维布局
- `backdrop-filter: blur()` 实现毛玻璃效果
- `@keyframes` 实现动画
- `Intersection Observer` API 实现滚动触发动画
- `scroll-behavior: smooth` 实现平滑滚动

## JS 技术要点
- 原生 DOM API（无 jQuery）
- Modal 组件：打开/关闭/Esc 键退出/点击遮罩关闭
- Intersection Observer：时间轴节点入场动画、卡片渐显
- 平滑滚动导航
- 回到顶部按钮（滚动超过一屏后显示）

## 部署流程
1. 在 GitHub 创建仓库 `username.github.io`
2. 推送代码到 `main` 分支
3. GitHub Pages 自动部署
4. 访问 `https://username.github.io` 查看

## 不纳入版本管理的文件
- `node_modules/`
- `地铁集团/`（含保密项目 PDF）
- `城投平台/`（含保密项目 PDF）
- 研究报告原始 PDF

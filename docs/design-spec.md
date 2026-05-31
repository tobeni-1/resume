# 设计规范

## 色彩系统

### 主题色 — 紫色系

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-primary` | `#7C3AED` | 主色：按钮、强调元素、激活态 |
| `--color-primary-light` | `#A78BFA` | 浅紫：hover 态、次要元素 |
| `--color-primary-dark` | `#5B21B6` | 深紫：渐变终点、深层强调 |
| `--color-primary-glow` | `#8B5CF6` | 发光色：阴影、光晕 |

### 背景色系

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-bg` | `#0F0A1A` | 页面主背景 |
| `--color-bg-elevated` | `#1A1130` | 卡片/面板背景 |
| `--color-bg-glass` | `rgba(26,17,48,0.6)` | 毛玻璃卡片 |

### 文字色系

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-text` | `#F5F3FF` | 主文字 |
| `--color-text-secondary` | `#A5A0B8` | 辅助文字 |
| `--color-text-muted` | `#6B6480` | 弱化文字 |

### 强调色

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-accent` | `#06D6A0` | 数据亮点、成功标记 |

### 边框色

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-border` | `rgba(124,58,237,0.2)` | 卡片边框 |
| `--color-border-hover` | `rgba(124,58,237,0.5)` | 悬停边框 |

---

## 字体系统

| 层级 | 字体栈 | 字号 | 字重 | 用途 |
|------|--------|------|------|------|
| H1 | PingFang SC, Microsoft YaHei, sans-serif | 56px / 3.5rem | 700 | 姓名 |
| H2 | 同上 | 36px / 2.25rem | 600 | 区域标题 |
| H3 | 同上 | 24px / 1.5rem | 600 | 卡片标题 |
| H4 | 同上 | 18px / 1.125rem | 600 | 子标题 |
| Body | 同上 | 16px / 1rem | 400 | 正文 |
| Small | 同上 | 14px / 0.875rem | 400 | 辅助文字 |
| Code/Data | JetBrains Mono, SF Mono, monospace | 14px | 400 | 数字/代码 |

**行高**：正文 1.75，标题 1.3

---

## 间距系统

基于 4px 基准的间距体系：

| Token | 值 | 用途 |
|-------|-----|------|
| `--space-xs` | 4px | 图标与文字间距 |
| `--space-sm` | 8px | 标签间距 |
| `--space-md` | 16px | 组件内边距 |
| `--space-lg` | 24px | 卡片内边距 |
| `--space-xl` | 32px | 区块内边距 |
| `--space-2xl` | 48px | 区块间距 |
| `--space-3xl` | 64px | 区域间距 |
| `--space-4xl` | 96px | Hero 与首区段间距 |

---

## 圆角

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | 6px | 标签 |
| `--radius-md` | 12px | 卡片、按钮 |
| `--radius-lg` | 16px | 大卡片、弹窗 |
| `--radius-full` | 9999px | 药丸形元素 |

---

## 阴影与发光

| Token | 值 | 用途 |
|-------|-----|------|
| `--shadow-card` | `0 4px 24px rgba(124,58,237,0.08)` | 卡片阴影 |
| `--shadow-card-hover` | `0 8px 40px rgba(124,58,237,0.2)` | 卡片悬停 |
| `--shadow-glow` | `0 0 20px rgba(139,92,246,0.3)` | 节点发光 |
| `--shadow-modal` | `0 16px 64px rgba(0,0,0,0.5)` | 弹窗阴影 |

---

## 动画规范

| 动画 | 时长 | 缓动 | 说明 |
|------|------|------|------|
| 卡片 hover | 300ms | ease-out | 上浮 + 发光增强 |
| 弹窗进出 | 300ms | ease-out | 缩放 + 淡入 |
| 时间轴节点入场 | 600ms | ease-out | 从中间线向外展开 |
| 导航栏背景显现 | 200ms | ease | 滚动后显示毛玻璃背景 |
| 粒子背景 | 20s | linear | 缓慢上浮漂移 |

---

## 图标

- 使用 Lucide Icons（开源、线框风格、科技感）
- 尺寸：小图标 16px，标准图标 20px，大图标 24-48px
- 颜色：继承父元素文字色或使用 `--color-primary-light`

---

## 响应式断点

| 断点 | 宽度 | 布局变化 |
|------|------|----------|
| Desktop | ≥ 1024px | 完整双栏布局 |
| Tablet | 768-1023px | 时间轴保持双栏、间距缩小 |
| Mobile | < 768px | 时间轴变单列、卡片全宽、导航折叠 |

🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/color-define

一个面向 Vue 3 和 Nuxt 应用的强类型颜色级别 Composable。定义一个 slug 和预定义范围 — 获取基于数值的响应式颜色级别、标签和样式。

仅状态：您控制 UI。引擎管理值。

## 安装

```bash
pnpm add @techmefr/color-define
```

## 快速开始

```typescript
import { defineColor } from '@techmefr/color-define'

const useColor = defineColor<[]>(() => ({ slug: 'fillrate' }))
```

```vue
<script setup>
const color = useColor()

color.setValue(80)
</script>

<template>
    <span :style="color.style.value">{{ color.label.value }}</span>
</template>
```

## 预定义 Slug

### `fillrate`

| 范围 | 级别 | Hex |
|------|------|-----|
| 0 - 70 | success | `#4CAF50` |
| 70 - 90 | warning | `#FB8C00` |
| 90+ | error | `#F44336` |

### `stock`

| 范围 | 级别 | Hex |
|------|------|-----|
| 0 - 30 | error | `#F44336` |
| 30 - 70 | warning | `#FB8C00` |
| 70+ | success | `#4CAF50` |

## 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `slug` | `'fillrate' \| 'stock'` | 必填 | 预定义颜色范围 |
| `reverse` | `boolean` | `false` | 交换 success 和 error 级别 |

## 许可证

MIT

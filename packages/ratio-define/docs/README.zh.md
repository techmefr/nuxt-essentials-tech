🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/ratio-define

一个面向 Vue 3 和 Nuxt 应用的强类型比率追踪 Composable。定义 current 和 max — 获取响应式百分比、比率、剩余值和完成状态。

仅状态：您控制 UI。引擎管理值。

## 安装

```bash
pnpm add @techmefr/ratio-define
```

## 快速开始

```typescript
import { defineRatio } from '@techmefr/ratio-define'

const useRatio = defineRatio<[]>(() => ({
    current: 0,
    max: 100,
}))
```

```vue
<script setup>
const ratio = useRatio()

ratio.setCurrent(45)
</script>

<template>
    <span>{{ ratio.percentage.value }}%</span>
    <span>剩余 {{ ratio.remaining.value }}</span>
</template>
```

## API

### `setCurrent(value)`

设置当前值。限制在 0 和 max 之间。

### `setMax(value)`

更新最大值。如果 current 超过新的 max，则被限制。

### `reset()`

重置 current 为 0。

### 计算属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `current` | `Ref<number>` | 当前值 |
| `max` | `Ref<number>` | 最大值 |
| `percentage` | `ComputedRef<number>` | 值为 0-100（四舍五入，0 位小数） |
| `ratio` | `ComputedRef<number>` | 值为 0-1（2 位小数） |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | 当 `current >= max` 时为 `true` |

## 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `max` | `number` | 必填 | 最大值 |
| `current` | `number` | `0` | 初始当前值 |

## 许可证

MIT

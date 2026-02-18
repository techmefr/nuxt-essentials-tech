🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/progress-define

一个用于 Vue 3 和 Nuxt 应用的类型化进度跟踪 composable。定义 max、unit 和 precision — 响应式获取 current、percentage、ratio、remaining 和 formatted。

仅状态管理：你控制 UI（v-progress-linear、自定义组件）。引擎管理数值。

## 安装

```bash
pnpm add @techmefr/progress-define
```

## 快速开始

```typescript
import { defineProgress } from '@techmefr/progress-define'

const useProgress = defineProgress<[]>(() => ({
    max: 100,
    unit: 'percent',
    precision: 0,
}))
```

```vue
<script setup>
const progress = useProgress()

progress.setCurrent(45)
</script>

<template>
    <v-progress-linear
        :model-value="progress.percentage.value"
        :color="progress.isComplete.value ? 'success' : 'primary'"
    ></v-progress-linear>
    <span>{{ progress.formatted.value }}</span>
</template>
```

## API

### `setCurrent(value)`

设置当前进度值。限制在 0 和 max 之间。

```typescript
progress.setCurrent(45)
progress.current.value // 45
```

### `setMax(value)`

更新 max 值。如果 current 超过新的 max，则会被限制。

```typescript
progress.setMax(200)
```

### `reset()`

将 current 重置为 0。

```typescript
progress.reset()
```

### Computed 属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `current` | `Ref<number>` | 当前进度值 |
| `max` | `Ref<number>` | 最大值 |
| `percentage` | `ComputedRef<number>` | 进度 0-100 |
| `ratio` | `ComputedRef<number>` | 进度 0-1 |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | 当 `current >= max` 时为 `true` |
| `formatted` | `ComputedRef<string>` | 根据 unit 显示 `'45%'` 或 `'45 / 100'` |

## 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `max` | `number` | 必填 | 最大进度值 |
| `unit` | `'percent' \| 'number'` | `'percent'` | `formatted` 的显示格式 |
| `precision` | `number` | `0` | percentage 和 ratio 的小数位数 |

## 与 threshold-define 组合

与 `@techmefr/threshold-define` 组合，根据进度获取动态颜色：

```typescript
import { defineProgress } from '@techmefr/progress-define'
import { defineThreshold } from '@techmefr/threshold-define'
import { watch } from 'vue'

const useProgress = defineProgress<[]>(() => ({
    max: 100,
    unit: 'percent',
}))

const useThreshold = defineThreshold<[]>(() => ({
    thresholds: [
        { min: 0, max: 25, color: '#F44336', textColor: '#fff', label: 'critical' },
        { min: 25, max: 50, color: '#FF9800', textColor: '#fff', label: 'warning' },
        { min: 50, max: 75, color: '#2196F3', textColor: '#fff', label: 'good' },
        { min: 75, max: 100, color: '#4CAF50', textColor: '#fff', label: 'excellent' },
    ],
}))

const progress = useProgress()
const threshold = useThreshold()

watch(progress.percentage, val => threshold.setValue(val))
```

```vue
<template>
    <v-progress-linear
        :model-value="progress.percentage.value"
        :color="threshold.color.value"
    ></v-progress-linear>
</template>
```

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower)：
- 生产环境自动清理 data-* 属性
- 用于单元测试、集成测试和 E2E 测试的测试辅助工具
- 使用 data-test-id、data-test-class、data-state 的标准化方法

## 许可证

MIT

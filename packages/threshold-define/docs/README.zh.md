🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/threshold-define

一个用于 Vue 3 和 Nuxt 应用的类型化阈值匹配 composable。定义带有颜色编码的范围，并根据当前值响应式地获取匹配结果、颜色、标签和样式。

仅管理状态：您控制界面（v-chip、v-progress-linear、自定义组件）。引擎管理匹配逻辑。

## 安装

```bash
pnpm add @techmefr/threshold-define
```

## 快速开始

```typescript
import { defineThreshold } from '@techmefr/threshold-define'

const useThreshold = defineThreshold<[]>(() => ({
    thresholds: [
        { min: 0, max: 25, color: '#F44336', textColor: '#fff', label: 'critical' },
        { min: 25, max: 50, color: '#FF9800', textColor: '#fff', label: 'warning' },
        { min: 50, max: 75, color: '#2196F3', textColor: '#fff', label: 'good' },
        { min: 75, max: 100, color: '#4CAF50', textColor: '#fff', label: 'excellent' },
    ],
}))
```

```vue
<script setup>
const threshold = useThreshold()

threshold.setValue(30)
</script>

<template>
    <v-chip :color="threshold.color.value" :style="threshold.style.value">
        {{ threshold.label.value }}
    </v-chip>
</template>
```

## API

### `setValue(value)`

设置当前值。匹配的阈值会响应式地计算。

```typescript
threshold.setValue(30)
threshold.label.value // 'warning'
threshold.color.value // '#FF9800'
```

### `reset()`

将值重置为 null。所有 computed 属性返回 null。

```typescript
threshold.reset()
```

### Computed 属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `value` | `Ref<number \| null>` | 当前值 |
| `match` | `ComputedRef<Partial<IThresholdStep> \| null>` | 匹配的阈值步骤 |
| `color` | `ComputedRef<string \| null>` | 匹配步骤的背景颜色 |
| `textColor` | `ComputedRef<string \| null>` | 匹配步骤的文本颜色 |
| `label` | `ComputedRef<string \| null>` | 匹配步骤的标签 |
| `style` | `ComputedRef<{ color: string; backgroundColor: string } \| null>` | 可直接使用的样式对象 |

## 阈值步骤 (Threshold Step)

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `min` | `number` | 是 | 下限（包含） |
| `max` | `number` | 是 | 上限（不包含） |
| `color` | `string` | 是 | 背景颜色 |
| `textColor` | `string` | 否 | 文本颜色 |
| `label` | `string` | 否 | 显示标签 |

## 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `thresholds` | `IThresholdStep[]` | 必填 | 阈值范围数组 |
| `fallback` | `Partial<IThresholdStep>` | `{ color: '#9E9E9E', textColor: '#fff', label: 'unknown' }` | 当没有阈值匹配时使用 |

## 与 progress-define 组合使用

与 `@techmefr/progress-define` 组合使用，根据进度获取动态颜色：

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
    <v-chip :style="threshold.style.value">
        {{ threshold.label.value }}
    </v-chip>
</template>
```

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower) 实现：
- 生产环境自动清理 data-* 属性
- 用于单元测试、集成测试和 E2E 测试的测试辅助工具
- 使用 data-test-id、data-test-class、data-state 的标准化方法

## 许可证

MIT

🇬🇧 [English](./README.md) | 🇫🇷 [Français](./docs/README.fr.md) | 🇪🇸 [Español](./docs/README.es.md) | 🇩🇪 [Deutsch](./docs/README.de.md) | 🇮🇹 [Italiano](./docs/README.it.md) | 🇨🇳 [中文](./docs/README.zh.md) | 🇧🇷 [Português](./docs/README.pt.md)

# @techmefr/threshold-define

A typed threshold matching composable for Vue 3 and Nuxt applications. Define color-coded ranges and get reactive match, color, label, and style based on the current value.

State-only: you control the UI (v-chip, v-progress-linear, custom components). The engine manages the matching.

## Installation

```bash
pnpm add @techmefr/threshold-define
```

## Quick Start

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

Set the current value. The matching threshold is computed reactively.

```typescript
threshold.setValue(30)
threshold.label.value // 'warning'
threshold.color.value // '#FF9800'
```

### `reset()`

Reset value to null. All computed properties return null.

```typescript
threshold.reset()
```

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | `Ref<number \| null>` | Current value |
| `match` | `ComputedRef<Partial<IThresholdStep> \| null>` | Matched threshold step |
| `color` | `ComputedRef<string \| null>` | Background color of matched step |
| `textColor` | `ComputedRef<string \| null>` | Text color of matched step |
| `label` | `ComputedRef<string \| null>` | Label of matched step |
| `style` | `ComputedRef<{ color: string; backgroundColor: string } \| null>` | Ready-to-use style object |

## Threshold Step

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `min` | `number` | yes | Lower bound (inclusive) |
| `max` | `number` | yes | Upper bound (exclusive) |
| `color` | `string` | yes | Background color |
| `textColor` | `string` | no | Text color |
| `label` | `string` | no | Display label |

## Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `thresholds` | `IThresholdStep[]` | required | Array of threshold ranges |
| `fallback` | `Partial<IThresholdStep>` | `{ color: '#9E9E9E', textColor: '#fff', label: 'unknown' }` | Used when no threshold matches |

## Combination with progress-define

Combine with `@techmefr/progress-define` to get dynamic colors based on progress:

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

## Testing

All modules follow testability best practices. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic cleanup of data-* attributes in production
- Testing helpers for unit, integration and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

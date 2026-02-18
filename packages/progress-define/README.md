🇬🇧 [English](./README.md) | 🇫🇷 [Français](./docs/README.fr.md) | 🇪🇸 [Español](./docs/README.es.md) | 🇩🇪 [Deutsch](./docs/README.de.md) | 🇮🇹 [Italiano](./docs/README.it.md) | 🇨🇳 [中文](./docs/README.zh.md) | 🇧🇷 [Português](./docs/README.pt.md)

# @techmefr/progress-define

A typed progress tracking composable for Vue 3 and Nuxt applications. Define max, unit, and precision — get reactive current, percentage, ratio, remaining, and formatted output.

State-only: you control the UI (v-progress-linear, custom components). The engine manages the values.

## Installation

```bash
pnpm add @techmefr/progress-define
```

## Quick Start

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

Set the current progress value. Clamped between 0 and max.

```typescript
progress.setCurrent(45)
progress.current.value // 45
```

### `setMax(value)`

Update the max value. Current is clamped if it exceeds the new max.

```typescript
progress.setMax(200)
```

### `reset()`

Reset current to 0.

```typescript
progress.reset()
```

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `current` | `Ref<number>` | Current progress value |
| `max` | `Ref<number>` | Maximum value |
| `percentage` | `ComputedRef<number>` | Progress as 0-100 |
| `ratio` | `ComputedRef<number>` | Progress as 0-1 |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` when `current >= max` |
| `formatted` | `ComputedRef<string>` | `'45%'` or `'45 / 100'` depending on unit |

## Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `max` | `number` | required | Maximum progress value |
| `unit` | `'percent' \| 'number'` | `'percent'` | Display format for `formatted` |
| `precision` | `number` | `0` | Decimal places for percentage and ratio |

## Combination with threshold-define

Combine with `@techmefr/threshold-define` to get dynamic colors based on progress:

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

## Testing

All modules follow testability best practices. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic cleanup of data-* attributes in production
- Testing helpers for unit, integration and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

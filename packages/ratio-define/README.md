🇬🇧 [English](./README.md) | 🇫🇷 [Français](./docs/README.fr.md) | 🇪🇸 [Español](./docs/README.es.md) | 🇩🇪 [Deutsch](./docs/README.de.md) | 🇮🇹 [Italiano](./docs/README.it.md) | 🇨🇳 [中文](./docs/README.zh.md) | 🇧🇷 [Português](./docs/README.pt.md)

# @techmefr/ratio-define

A typed ratio tracking composable for Vue 3 and Nuxt applications. Define current and max — get reactive percentage, ratio, remaining and completion state.

State-only: you control the UI. The engine manages the values.

## Installation

```bash
pnpm add @techmefr/ratio-define
```

## Quick Start

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
    <span>{{ ratio.remaining.value }} remaining</span>
</template>
```

## API

### `setCurrent(value)`

Set the current value. Clamped between 0 and max.

```typescript
ratio.setCurrent(45)
ratio.current.value // 45
ratio.percentage.value // 45
```

### `setMax(value)`

Update the max value. Current is clamped if it exceeds the new max.

```typescript
ratio.setMax(200)
```

### `reset()`

Reset current to 0.

```typescript
ratio.reset()
```

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `current` | `Ref<number>` | Current value |
| `max` | `Ref<number>` | Maximum value |
| `percentage` | `ComputedRef<number>` | Value as 0-100 (rounded, 0 decimals) |
| `ratio` | `ComputedRef<number>` | Value as 0-1 (2 decimals) |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` when `current >= max` |

## Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `max` | `number` | required | Maximum value |
| `current` | `number` | `0` | Initial current value |

## Testing

All modules follow testability best practices. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic cleanup of data-* attributes in production
- Testing helpers for unit, integration and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

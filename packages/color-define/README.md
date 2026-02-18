🇬🇧 [English](./README.md) | 🇫🇷 [Français](./docs/README.fr.md) | 🇪🇸 [Español](./docs/README.es.md) | 🇩🇪 [Deutsch](./docs/README.de.md) | 🇮🇹 [Italiano](./docs/README.it.md) | 🇨🇳 [中文](./docs/README.zh.md) | 🇧🇷 [Português](./docs/README.pt.md)

# @techmefr/color-define

A typed color level composable for Vue 3 and Nuxt applications. Define a slug with predefined ranges — get reactive color level, label and style based on a numeric value.

State-only: you control the UI. The engine manages the values.

## Installation

```bash
pnpm add @techmefr/color-define
```

## Quick Start

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

## API

### `setValue(value)`

Set the numeric value. The color level is computed from the slug's ranges.

```typescript
color.setValue(80)
color.color.value // 'warning'
color.style.value // { color: '#FB8C00' }
```

### `reset()`

Reset value to null.

```typescript
color.reset()
```

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | `Ref<number \| null>` | Current numeric value |
| `color` | `ComputedRef<ColorLevel \| null>` | `'success'`, `'warning'` or `'error'` |
| `label` | `ComputedRef<ColorLevel \| null>` | Same as color (for display) |
| `style` | `ComputedRef<{ color: string } \| null>` | CSS style object with hex color |

## Predefined Slugs

### `fillrate`

| Range | Level | Hex |
|-------|-------|-----|
| 0 - 70 | success | `#4CAF50` |
| 70 - 90 | warning | `#FB8C00` |
| 90+ | error | `#F44336` |

### `stock`

| Range | Level | Hex |
|-------|-------|-----|
| 0 - 30 | error | `#F44336` |
| 30 - 70 | warning | `#FB8C00` |
| 70+ | success | `#4CAF50` |

## Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slug` | `'fillrate' \| 'stock'` | required | Predefined color range |
| `reverse` | `boolean` | `false` | Swap success and error levels |

## Testing

All modules follow testability best practices. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic cleanup of data-* attributes in production
- Testing helpers for unit, integration and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

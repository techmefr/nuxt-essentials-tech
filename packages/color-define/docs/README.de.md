🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/color-define

Ein typisiertes Farbstufen-Composable für Vue 3 und Nuxt Anwendungen. Definiere einen Slug mit vordefinierten Bereichen — erhalte reaktive Farbstufe, Label und Stil basierend auf einem numerischen Wert.

Nur Zustand: Sie steuern die UI. Die Engine verwaltet die Werte.

## Installation

```bash
pnpm add @techmefr/color-define
```

## Schnellstart

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

## Vordefinierte Slugs

### `fillrate`

| Bereich | Stufe | Hex |
|---------|-------|-----|
| 0 - 70 | success | `#4CAF50` |
| 70 - 90 | warning | `#FB8C00` |
| 90+ | error | `#F44336` |

### `stock`

| Bereich | Stufe | Hex |
|---------|-------|-----|
| 0 - 30 | error | `#F44336` |
| 30 - 70 | warning | `#FB8C00` |
| 70+ | success | `#4CAF50` |

## Config

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|-------------|
| `slug` | `'fillrate' \| 'stock'` | erforderlich | Vordefinierter Farbbereich |
| `reverse` | `boolean` | `false` | Tauscht success und error Stufen |

## Lizenz

MIT

🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/color-define

Un composable tipado de nivel de color para aplicaciones Vue 3 y Nuxt. Define un slug con rangos predefinidos — obtén nivel de color, etiqueta y estilo reactivos basados en un valor numérico.

Solo estado: tú controlas la UI. El motor gestiona los valores.

## Instalación

```bash
pnpm add @techmefr/color-define
```

## Inicio rápido

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

## Slugs predefinidos

### `fillrate`

| Rango | Nivel | Hex |
|-------|-------|-----|
| 0 - 70 | success | `#4CAF50` |
| 70 - 90 | warning | `#FB8C00` |
| 90+ | error | `#F44336` |

### `stock`

| Rango | Nivel | Hex |
|-------|-------|-----|
| 0 - 30 | error | `#F44336` |
| 30 - 70 | warning | `#FB8C00` |
| 70+ | success | `#4CAF50` |

## Config

| Propiedad | Tipo | Defecto | Descripción |
|-----------|------|---------|-------------|
| `slug` | `'fillrate' \| 'stock'` | requerido | Rango de colores predefinido |
| `reverse` | `boolean` | `false` | Intercambia los niveles success y error |

## Licencia

MIT

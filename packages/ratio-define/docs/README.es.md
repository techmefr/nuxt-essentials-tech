🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/ratio-define

Un composable tipado de seguimiento de ratio para aplicaciones Vue 3 y Nuxt. Define current y max — obtén porcentaje, ratio, restante y estado de completitud reactivos.

Solo estado: tú controlas la UI. El motor gestiona los valores.

## Instalación

```bash
pnpm add @techmefr/ratio-define
```

## Inicio rápido

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
    <span>{{ ratio.remaining.value }} restante</span>
</template>
```

## API

### `setCurrent(value)`

Establece el valor actual. Limitado entre 0 y max.

### `setMax(value)`

Actualiza el valor máximo. Current se limita si excede el nuevo max.

### `reset()`

Reinicia current a 0.

### Propiedades calculadas

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `current` | `Ref<number>` | Valor actual |
| `max` | `Ref<number>` | Valor máximo |
| `percentage` | `ComputedRef<number>` | Valor como 0-100 (redondeado, 0 decimales) |
| `ratio` | `ComputedRef<number>` | Valor como 0-1 (2 decimales) |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` cuando `current >= max` |

## Config

| Propiedad | Tipo | Defecto | Descripción |
|-----------|------|---------|-------------|
| `max` | `number` | requerido | Valor máximo |
| `current` | `number` | `0` | Valor actual inicial |

## Licencia

MIT

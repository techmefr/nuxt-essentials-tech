🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/progress-define

Un composable tipado para el seguimiento de progreso en aplicaciones Vue 3 y Nuxt. Define max, unit y precision — obtiene de forma reactiva current, percentage, ratio, remaining y formatted.

State-only: tu controlas la UI (v-progress-linear, componentes personalizados). El motor gestiona los valores.

## Instalacion

```bash
pnpm add @techmefr/progress-define
```

## Inicio rapido

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

Establece el valor de progreso actual. Limitado entre 0 y max.

```typescript
progress.setCurrent(45)
progress.current.value // 45
```

### `setMax(value)`

Actualiza el valor max. Current se limita si supera el nuevo max.

```typescript
progress.setMax(200)
```

### `reset()`

Reinicia current a 0.

```typescript
progress.reset()
```

### Propiedades computed

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| `current` | `Ref<number>` | Valor de progreso actual |
| `max` | `Ref<number>` | Valor maximo |
| `percentage` | `ComputedRef<number>` | Progreso de 0 a 100 |
| `ratio` | `ComputedRef<number>` | Progreso de 0 a 1 |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` cuando `current >= max` |
| `formatted` | `ComputedRef<string>` | `'45%'` o `'45 / 100'` segun unit |

## Configuracion

| Propiedad | Tipo | Por defecto | Descripcion |
|-----------|------|-------------|-------------|
| `max` | `number` | requerido | Valor maximo de progreso |
| `unit` | `'percent' \| 'number'` | `'percent'` | Formato de visualizacion para `formatted` |
| `precision` | `number` | `0` | Decimales para percentage y ratio |

## Combinacion con threshold-define

Combina con `@techmefr/threshold-define` para obtener colores dinamicos basados en el progreso:

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

## Tests

Todos los modulos siguen las buenas practicas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automatica de atributos data-* en produccion
- Helpers de test para tests unitarios, de integracion y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

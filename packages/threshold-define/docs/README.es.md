🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/threshold-define

Un composable tipado de correspondencia de umbrales para aplicaciones Vue 3 y Nuxt. Define rangos con codigos de color y obtiene de forma reactiva la correspondencia, el color, la etiqueta y el estilo segun el valor actual.

State-only: tu controlas la interfaz (v-chip, v-progress-linear, componentes personalizados). El motor gestiona la correspondencia.

## Instalacion

```bash
pnpm add @techmefr/threshold-define
```

## Inicio rapido

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

Establece el valor actual. El umbral correspondiente se calcula de forma reactiva.

```typescript
threshold.setValue(30)
threshold.label.value // 'warning'
threshold.color.value // '#FF9800'
```

### `reset()`

Reinicia el valor a null. Todas las propiedades computed devuelven null.

```typescript
threshold.reset()
```

### Propiedades computed

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| `value` | `Ref<number \| null>` | Valor actual |
| `match` | `ComputedRef<Partial<IThresholdStep> \| null>` | Umbral correspondiente |
| `color` | `ComputedRef<string \| null>` | Color de fondo del umbral correspondiente |
| `textColor` | `ComputedRef<string \| null>` | Color del texto del umbral correspondiente |
| `label` | `ComputedRef<string \| null>` | Etiqueta del umbral correspondiente |
| `style` | `ComputedRef<{ color: string; backgroundColor: string } \| null>` | Objeto de estilo listo para usar |

## Umbral (Threshold Step)

| Propiedad | Tipo | Requerido | Descripcion |
|-----------|------|-----------|-------------|
| `min` | `number` | si | Limite inferior (inclusivo) |
| `max` | `number` | si | Limite superior (exclusivo) |
| `color` | `string` | si | Color de fondo |
| `textColor` | `string` | no | Color del texto |
| `label` | `string` | no | Etiqueta de visualizacion |

## Configuracion

| Propiedad | Tipo | Por defecto | Descripcion |
|-----------|------|-------------|-------------|
| `thresholds` | `IThresholdStep[]` | requerido | Array de rangos de umbrales |
| `fallback` | `Partial<IThresholdStep>` | `{ color: '#9E9E9E', textColor: '#fff', label: 'unknown' }` | Usado cuando ningun umbral corresponde |

## Combinacion con progress-define

Combina con `@techmefr/progress-define` para obtener colores dinamicos basados en el progreso:

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

## Pruebas

Todos los modulos siguen las buenas practicas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automatica de atributos data-* en produccion
- Helpers de pruebas para tests unitarios, de integracion y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

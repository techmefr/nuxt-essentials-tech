🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/progress-define

Un composable tipizzato per il tracciamento del progresso nelle applicazioni Vue 3 e Nuxt. Definisci max, unit e precision — ottieni in modo reattivo current, percentage, ratio, remaining e formatted.

State-only: tu controlli la UI (v-progress-linear, componenti personalizzati). Il motore gestisce i valori.

## Installazione

```bash
pnpm add @techmefr/progress-define
```

## Avvio rapido

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

Imposta il valore di progresso attuale. Limitato tra 0 e max.

```typescript
progress.setCurrent(45)
progress.current.value // 45
```

### `setMax(value)`

Aggiorna il valore max. Current viene limitato se supera il nuovo max.

```typescript
progress.setMax(200)
```

### `reset()`

Reimposta current a 0.

```typescript
progress.reset()
```

### Proprieta computed

| Proprieta | Tipo | Descrizione |
|-----------|------|-------------|
| `current` | `Ref<number>` | Valore di progresso attuale |
| `max` | `Ref<number>` | Valore massimo |
| `percentage` | `ComputedRef<number>` | Progresso da 0 a 100 |
| `ratio` | `ComputedRef<number>` | Progresso da 0 a 1 |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` quando `current >= max` |
| `formatted` | `ComputedRef<string>` | `'45%'` o `'45 / 100'` a seconda di unit |

## Configurazione

| Proprieta | Tipo | Predefinito | Descrizione |
|-----------|------|-------------|-------------|
| `max` | `number` | obbligatorio | Valore massimo di progresso |
| `unit` | `'percent' \| 'number'` | `'percent'` | Formato di visualizzazione per `formatted` |
| `precision` | `number` | `0` | Decimali per percentage e ratio |

## Combinazione con threshold-define

Combina con `@techmefr/threshold-define` per ottenere colori dinamici basati sul progresso:

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

## Test

Tutti i moduli seguono le best practice di testabilita. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) per:
- Pulizia automatica degli attributi data-* in produzione
- Helper di test per test unitari, di integrazione e E2E
- Approccio standardizzato con data-test-id, data-test-class, data-state

## Licenza

MIT

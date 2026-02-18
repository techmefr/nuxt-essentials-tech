🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/threshold-define

Un composable tipizzato per la corrispondenza di soglie per applicazioni Vue 3 e Nuxt. Definisci intervalli con codici colore e ottieni in modo reattivo la corrispondenza, il colore, l'etichetta e lo stile in base al valore attuale.

State-only: tu controlli l'interfaccia (v-chip, v-progress-linear, componenti personalizzati). Il motore gestisce la corrispondenza.

## Installazione

```bash
pnpm add @techmefr/threshold-define
```

## Avvio rapido

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

Imposta il valore attuale. La soglia corrispondente viene calcolata in modo reattivo.

```typescript
threshold.setValue(30)
threshold.label.value // 'warning'
threshold.color.value // '#FF9800'
```

### `reset()`

Reimposta il valore a null. Tutte le proprieta computed restituiscono null.

```typescript
threshold.reset()
```

### Proprieta computed

| Proprieta | Tipo | Descrizione |
|-----------|------|-------------|
| `value` | `Ref<number \| null>` | Valore attuale |
| `match` | `ComputedRef<Partial<IThresholdStep> \| null>` | Soglia corrispondente |
| `color` | `ComputedRef<string \| null>` | Colore di sfondo della soglia corrispondente |
| `textColor` | `ComputedRef<string \| null>` | Colore del testo della soglia corrispondente |
| `label` | `ComputedRef<string \| null>` | Etichetta della soglia corrispondente |
| `style` | `ComputedRef<{ color: string; backgroundColor: string } \| null>` | Oggetto stile pronto all'uso |

## Soglia (Threshold Step)

| Proprieta | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `min` | `number` | si | Limite inferiore (inclusivo) |
| `max` | `number` | si | Limite superiore (esclusivo) |
| `color` | `string` | si | Colore di sfondo |
| `textColor` | `string` | no | Colore del testo |
| `label` | `string` | no | Etichetta di visualizzazione |

## Configurazione

| Proprieta | Tipo | Predefinito | Descrizione |
|-----------|------|-------------|-------------|
| `thresholds` | `IThresholdStep[]` | obbligatorio | Array di intervalli di soglie |
| `fallback` | `Partial<IThresholdStep>` | `{ color: '#9E9E9E', textColor: '#fff', label: 'unknown' }` | Utilizzato quando nessuna soglia corrisponde |

## Combinazione con progress-define

Combina con `@techmefr/progress-define` per ottenere colori dinamici basati sul progresso:

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

## Test

Tutti i moduli seguono le buone pratiche di testabilita. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) per:
- Pulizia automatica degli attributi data-* in produzione
- Helper di test per test unitari, di integrazione e E2E
- Approccio standardizzato con data-test-id, data-test-class, data-state

## Licenza

MIT

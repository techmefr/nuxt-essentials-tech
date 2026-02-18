🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/progress-define

Ein typisiertes Composable zur Fortschrittsverfolgung fuer Vue 3 und Nuxt Anwendungen. Definiere max, unit und precision — erhalte reaktiv current, percentage, ratio, remaining und formatted.

State-only: Du kontrollierst die UI (v-progress-linear, eigene Komponenten). Die Engine verwaltet die Werte.

## Installation

```bash
pnpm add @techmefr/progress-define
```

## Schnellstart

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

Setzt den aktuellen Fortschrittswert. Begrenzt zwischen 0 und max.

```typescript
progress.setCurrent(45)
progress.current.value // 45
```

### `setMax(value)`

Aktualisiert den max-Wert. Current wird begrenzt, wenn er den neuen max ueberschreitet.

```typescript
progress.setMax(200)
```

### `reset()`

Setzt current auf 0 zurueck.

```typescript
progress.reset()
```

### Computed Eigenschaften

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|--------------|
| `current` | `Ref<number>` | Aktueller Fortschrittswert |
| `max` | `Ref<number>` | Maximalwert |
| `percentage` | `ComputedRef<number>` | Fortschritt von 0 bis 100 |
| `ratio` | `ComputedRef<number>` | Fortschritt von 0 bis 1 |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` wenn `current >= max` |
| `formatted` | `ComputedRef<string>` | `'45%'` oder `'45 / 100'` je nach unit |

## Konfiguration

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `max` | `number` | erforderlich | Maximaler Fortschrittswert |
| `unit` | `'percent' \| 'number'` | `'percent'` | Anzeigeformat fuer `formatted` |
| `precision` | `number` | `0` | Dezimalstellen fuer percentage und ratio |

## Kombination mit threshold-define

Kombiniere mit `@techmefr/threshold-define` fuer dynamische Farben basierend auf dem Fortschritt:

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

Alle Module folgen den Best Practices fuer Testbarkeit. Verwende [@techmefr/Datapower](https://github.com/techmefr/Datapower) fuer:
- Automatische Bereinigung von data-* Attributen in Produktion
- Test-Helpers fuer Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

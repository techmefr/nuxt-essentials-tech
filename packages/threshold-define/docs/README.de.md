🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/threshold-define

Ein typisiertes Schwellenwert-Matching-Composable fuer Vue 3 und Nuxt Anwendungen. Definieren Sie farbcodierte Bereiche und erhalten Sie reaktiv die Uebereinstimmung, Farbe, Bezeichnung und den Stil basierend auf dem aktuellen Wert.

State-only: Sie steuern die Oberflaeche (v-chip, v-progress-linear, benutzerdefinierte Komponenten). Die Engine verwaltet die Zuordnung.

## Installation

```bash
pnpm add @techmefr/threshold-define
```

## Schnellstart

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

Setzt den aktuellen Wert. Der passende Schwellenwert wird reaktiv berechnet.

```typescript
threshold.setValue(30)
threshold.label.value // 'warning'
threshold.color.value // '#FF9800'
```

### `reset()`

Setzt den Wert auf null zurueck. Alle computed Eigenschaften geben null zurueck.

```typescript
threshold.reset()
```

### Computed Eigenschaften

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|--------------|
| `value` | `Ref<number \| null>` | Aktueller Wert |
| `match` | `ComputedRef<Partial<IThresholdStep> \| null>` | Uebereinstimmender Schwellenwert |
| `color` | `ComputedRef<string \| null>` | Hintergrundfarbe des passenden Schwellenwerts |
| `textColor` | `ComputedRef<string \| null>` | Textfarbe des passenden Schwellenwerts |
| `label` | `ComputedRef<string \| null>` | Bezeichnung des passenden Schwellenwerts |
| `style` | `ComputedRef<{ color: string; backgroundColor: string } \| null>` | Fertiges Style-Objekt |

## Schwellenwert (Threshold Step)

| Eigenschaft | Typ | Erforderlich | Beschreibung |
|-------------|-----|--------------|--------------|
| `min` | `number` | ja | Untergrenze (inklusiv) |
| `max` | `number` | ja | Obergrenze (exklusiv) |
| `color` | `string` | ja | Hintergrundfarbe |
| `textColor` | `string` | nein | Textfarbe |
| `label` | `string` | nein | Anzeigebezeichnung |

## Konfiguration

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `thresholds` | `IThresholdStep[]` | erforderlich | Array von Schwellenwertbereichen |
| `fallback` | `Partial<IThresholdStep>` | `{ color: '#9E9E9E', textColor: '#fff', label: 'unknown' }` | Wird verwendet wenn kein Schwellenwert passt |

## Kombination mit progress-define

Kombinieren Sie mit `@techmefr/progress-define` fuer dynamische Farben basierend auf dem Fortschritt:

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

## Tests

Alle Module folgen den Best Practices fuer Testbarkeit. Verwenden Sie [@techmefr/Datapower](https://github.com/techmefr/Datapower) fuer:
- Automatische Bereinigung von data-* Attributen in der Produktion
- Test-Helpers fuer Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

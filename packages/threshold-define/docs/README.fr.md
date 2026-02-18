🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/threshold-define

Un composable de correspondance de seuils type pour les applications Vue 3 et Nuxt. Definissez des plages avec codes couleur et obtenez de maniere reactive la correspondance, la couleur, le label et le style en fonction de la valeur actuelle.

State-only : vous controlez l'interface (v-chip, v-progress-linear, composants personnalises). Le moteur gere la correspondance.

## Installation

```bash
pnpm add @techmefr/threshold-define
```

## Demarrage rapide

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

Definit la valeur actuelle. Le seuil correspondant est calcule de maniere reactive.

```typescript
threshold.setValue(30)
threshold.label.value // 'warning'
threshold.color.value // '#FF9800'
```

### `reset()`

Reinitialise la valeur a null. Toutes les proprietes computed retournent null.

```typescript
threshold.reset()
```

### Proprietes computed

| Propriete | Type | Description |
|-----------|------|-------------|
| `value` | `Ref<number \| null>` | Valeur actuelle |
| `match` | `ComputedRef<Partial<IThresholdStep> \| null>` | Seuil correspondant |
| `color` | `ComputedRef<string \| null>` | Couleur de fond du seuil correspondant |
| `textColor` | `ComputedRef<string \| null>` | Couleur du texte du seuil correspondant |
| `label` | `ComputedRef<string \| null>` | Label du seuil correspondant |
| `style` | `ComputedRef<{ color: string; backgroundColor: string } \| null>` | Objet de style pret a l'emploi |

## Seuil (Threshold Step)

| Propriete | Type | Requis | Description |
|-----------|------|--------|-------------|
| `min` | `number` | oui | Borne inferieure (inclusive) |
| `max` | `number` | oui | Borne superieure (exclusive) |
| `color` | `string` | oui | Couleur de fond |
| `textColor` | `string` | non | Couleur du texte |
| `label` | `string` | non | Label d'affichage |

## Configuration

| Propriete | Type | Defaut | Description |
|-----------|------|--------|-------------|
| `thresholds` | `IThresholdStep[]` | requis | Tableau de plages de seuils |
| `fallback` | `Partial<IThresholdStep>` | `{ color: '#9E9E9E', textColor: '#fff', label: 'unknown' }` | Utilise quand aucun seuil ne correspond |

## Combinaison avec progress-define

Combinez avec `@techmefr/progress-define` pour obtenir des couleurs dynamiques basees sur la progression :

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

Tous les modules suivent les bonnes pratiques de testabilite. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'integration et E2E
- Approche standardisee avec data-test-id, data-test-class, data-state

## Licence

MIT

🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/progress-define

Un composable type pour le suivi de progression dans les applications Vue 3 et Nuxt. Definissez max, unit et precision — obtenez de maniere reactive current, percentage, ratio, remaining et formatted.

State-only : vous controlez l'UI (v-progress-linear, composants personnalises). Le moteur gere les valeurs.

## Installation

```bash
pnpm add @techmefr/progress-define
```

## Demarrage rapide

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

Definit la valeur de progression actuelle. Bornee entre 0 et max.

```typescript
progress.setCurrent(45)
progress.current.value // 45
```

### `setMax(value)`

Met a jour la valeur max. Current est borne si elle depasse le nouveau max.

```typescript
progress.setMax(200)
```

### `reset()`

Reinitialise current a 0.

```typescript
progress.reset()
```

### Proprietes computed

| Propriete | Type | Description |
|-----------|------|-------------|
| `current` | `Ref<number>` | Valeur de progression actuelle |
| `max` | `Ref<number>` | Valeur maximale |
| `percentage` | `ComputedRef<number>` | Progression de 0 a 100 |
| `ratio` | `ComputedRef<number>` | Progression de 0 a 1 |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` quand `current >= max` |
| `formatted` | `ComputedRef<string>` | `'45%'` ou `'45 / 100'` selon unit |

## Configuration

| Propriete | Type | Defaut | Description |
|-----------|------|--------|-------------|
| `max` | `number` | requis | Valeur maximale de progression |
| `unit` | `'percent' \| 'number'` | `'percent'` | Format d'affichage pour `formatted` |
| `precision` | `number` | `0` | Nombre de decimales pour percentage et ratio |

## Combinaison avec threshold-define

Combinez avec `@techmefr/threshold-define` pour obtenir des couleurs dynamiques basees sur la progression :

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

Tous les modules suivent les bonnes pratiques de testabilite. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'integration et E2E
- Approche standardisee avec data-test-id, data-test-class, data-state

## Licence

MIT

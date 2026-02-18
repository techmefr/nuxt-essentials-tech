🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/ratio-define

Un composable typé de suivi de ratio pour les applications Vue 3 et Nuxt. Définissez current et max — obtenez pourcentage, ratio, restant et état de complétion réactifs.

État uniquement : vous contrôlez l'UI. Le moteur gère les valeurs.

## Installation

```bash
pnpm add @techmefr/ratio-define
```

## Démarrage rapide

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
    <span>{{ ratio.remaining.value }} restant</span>
</template>
```

## API

### `setCurrent(value)`

Définit la valeur courante. Limitée entre 0 et max.

### `setMax(value)`

Met à jour la valeur maximale. Current est limité si il dépasse le nouveau max.

### `reset()`

Réinitialise current à 0.

### Propriétés calculées

| Propriété | Type | Description |
|-----------|------|-------------|
| `current` | `Ref<number>` | Valeur courante |
| `max` | `Ref<number>` | Valeur maximale |
| `percentage` | `ComputedRef<number>` | Valeur en 0-100 (arrondi, 0 décimales) |
| `ratio` | `ComputedRef<number>` | Valeur en 0-1 (2 décimales) |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` quand `current >= max` |

## Config

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `max` | `number` | requis | Valeur maximale |
| `current` | `number` | `0` | Valeur courante initiale |

## Licence

MIT

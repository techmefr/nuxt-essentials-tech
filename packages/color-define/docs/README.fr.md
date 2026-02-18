🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/color-define

Un composable typé de niveau de couleur pour les applications Vue 3 et Nuxt. Définissez un slug avec des plages prédéfinies — obtenez le niveau de couleur, le label et le style réactifs basés sur une valeur numérique.

État uniquement : vous contrôlez l'UI. Le moteur gère les valeurs.

## Installation

```bash
pnpm add @techmefr/color-define
```

## Démarrage rapide

```typescript
import { defineColor } from '@techmefr/color-define'

const useColor = defineColor<[]>(() => ({ slug: 'fillrate' }))
```

```vue
<script setup>
const color = useColor()

color.setValue(80)
</script>

<template>
    <span :style="color.style.value">{{ color.label.value }}</span>
</template>
```

## Slugs prédéfinis

### `fillrate`

| Plage | Niveau | Hex |
|-------|--------|-----|
| 0 - 70 | success | `#4CAF50` |
| 70 - 90 | warning | `#FB8C00` |
| 90+ | error | `#F44336` |

### `stock`

| Plage | Niveau | Hex |
|-------|--------|-----|
| 0 - 30 | error | `#F44336` |
| 30 - 70 | warning | `#FB8C00` |
| 70+ | success | `#4CAF50` |

## Config

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `slug` | `'fillrate' \| 'stock'` | requis | Plage de couleurs prédéfinie |
| `reverse` | `boolean` | `false` | Inverse les niveaux success et error |

## Licence

MIT

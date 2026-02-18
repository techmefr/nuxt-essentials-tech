🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/color-define

Un composable tipizzato per livelli di colore per applicazioni Vue 3 e Nuxt. Definisci uno slug con intervalli predefiniti — ottieni livello di colore, etichetta e stile reattivi basati su un valore numerico.

Solo stato: tu controlli la UI. Il motore gestisce i valori.

## Installazione

```bash
pnpm add @techmefr/color-define
```

## Avvio rapido

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

## Slug predefiniti

### `fillrate`

| Intervallo | Livello | Hex |
|------------|---------|-----|
| 0 - 70 | success | `#4CAF50` |
| 70 - 90 | warning | `#FB8C00` |
| 90+ | error | `#F44336` |

### `stock`

| Intervallo | Livello | Hex |
|------------|---------|-----|
| 0 - 30 | error | `#F44336` |
| 30 - 70 | warning | `#FB8C00` |
| 70+ | success | `#4CAF50` |

## Config

| Proprietà | Tipo | Default | Descrizione |
|-----------|------|---------|-------------|
| `slug` | `'fillrate' \| 'stock'` | richiesto | Intervallo di colori predefinito |
| `reverse` | `boolean` | `false` | Scambia i livelli success e error |

## Licenza

MIT

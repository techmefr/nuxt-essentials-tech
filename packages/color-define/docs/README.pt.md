🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/color-define

Um composable tipado de nível de cor para aplicações Vue 3 e Nuxt. Defina um slug com faixas predefinidas — obtenha nível de cor, rótulo e estilo reativos baseados em um valor numérico.

Apenas estado: você controla a UI. O motor gerencia os valores.

## Instalação

```bash
pnpm add @techmefr/color-define
```

## Início rápido

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

## Slugs predefinidos

### `fillrate`

| Faixa | Nível | Hex |
|-------|-------|-----|
| 0 - 70 | success | `#4CAF50` |
| 70 - 90 | warning | `#FB8C00` |
| 90+ | error | `#F44336` |

### `stock`

| Faixa | Nível | Hex |
|-------|-------|-----|
| 0 - 30 | error | `#F44336` |
| 30 - 70 | warning | `#FB8C00` |
| 70+ | success | `#4CAF50` |

## Config

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `slug` | `'fillrate' \| 'stock'` | obrigatório | Faixa de cores predefinida |
| `reverse` | `boolean` | `false` | Troca os níveis success e error |

## Licença

MIT

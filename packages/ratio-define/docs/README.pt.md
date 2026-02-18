🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/ratio-define

Um composable tipado de acompanhamento de razão para aplicações Vue 3 e Nuxt. Defina current e max — obtenha percentual, razão, restante e estado de conclusão reativos.

Apenas estado: você controla a UI. O motor gerencia os valores.

## Instalação

```bash
pnpm add @techmefr/ratio-define
```

## Início rápido

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
    <span>{{ ratio.remaining.value }} restante</span>
</template>
```

## API

### `setCurrent(value)`

Define o valor atual. Limitado entre 0 e max.

### `setMax(value)`

Atualiza o valor máximo. Current é limitado se exceder o novo max.

### `reset()`

Redefine current para 0.

### Propriedades calculadas

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `current` | `Ref<number>` | Valor atual |
| `max` | `Ref<number>` | Valor máximo |
| `percentage` | `ComputedRef<number>` | Valor como 0-100 (arredondado, 0 decimais) |
| `ratio` | `ComputedRef<number>` | Valor como 0-1 (2 decimais) |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` quando `current >= max` |

## Config

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `max` | `number` | obrigatório | Valor máximo |
| `current` | `number` | `0` | Valor atual inicial |

## Licença

MIT

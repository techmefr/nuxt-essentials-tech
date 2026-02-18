🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/progress-define

Um composable tipado para rastreamento de progresso em aplicacoes Vue 3 e Nuxt. Defina max, unit e precision — obtenha de forma reativa current, percentage, ratio, remaining e formatted.

State-only: voce controla a UI (v-progress-linear, componentes personalizados). O motor gerencia os valores.

## Instalacao

```bash
pnpm add @techmefr/progress-define
```

## Inicio rapido

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

Define o valor de progresso atual. Limitado entre 0 e max.

```typescript
progress.setCurrent(45)
progress.current.value // 45
```

### `setMax(value)`

Atualiza o valor max. Current e limitado se ultrapassar o novo max.

```typescript
progress.setMax(200)
```

### `reset()`

Redefine current para 0.

```typescript
progress.reset()
```

### Propriedades computed

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `current` | `Ref<number>` | Valor de progresso atual |
| `max` | `Ref<number>` | Valor maximo |
| `percentage` | `ComputedRef<number>` | Progresso de 0 a 100 |
| `ratio` | `ComputedRef<number>` | Progresso de 0 a 1 |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` quando `current >= max` |
| `formatted` | `ComputedRef<string>` | `'45%'` ou `'45 / 100'` dependendo de unit |

## Configuracao

| Propriedade | Tipo | Padrao | Descricao |
|-------------|------|--------|-----------|
| `max` | `number` | obrigatorio | Valor maximo de progresso |
| `unit` | `'percent' \| 'number'` | `'percent'` | Formato de exibicao para `formatted` |
| `precision` | `number` | `0` | Casas decimais para percentage e ratio |

## Combinacao com threshold-define

Combine com `@techmefr/threshold-define` para obter cores dinamicas baseadas no progresso:

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

## Testes

Todos os modulos seguem as boas praticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automatica de atributos data-* em producao
- Helpers de teste para testes unitarios, de integracao e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licenca

MIT

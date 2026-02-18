🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/threshold-define

Um composable tipado de correspondencia de limiares para aplicacoes Vue 3 e Nuxt. Defina intervalos com codigos de cor e obtenha de forma reativa a correspondencia, a cor, o rotulo e o estilo com base no valor atual.

State-only: voce controla a interface (v-chip, v-progress-linear, componentes personalizados). O motor gerencia a correspondencia.

## Instalacao

```bash
pnpm add @techmefr/threshold-define
```

## Inicio rapido

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

Define o valor atual. O limiar correspondente e calculado de forma reativa.

```typescript
threshold.setValue(30)
threshold.label.value // 'warning'
threshold.color.value // '#FF9800'
```

### `reset()`

Redefine o valor para null. Todas as propriedades computed retornam null.

```typescript
threshold.reset()
```

### Propriedades computed

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `value` | `Ref<number \| null>` | Valor atual |
| `match` | `ComputedRef<Partial<IThresholdStep> \| null>` | Limiar correspondente |
| `color` | `ComputedRef<string \| null>` | Cor de fundo do limiar correspondente |
| `textColor` | `ComputedRef<string \| null>` | Cor do texto do limiar correspondente |
| `label` | `ComputedRef<string \| null>` | Rotulo do limiar correspondente |
| `style` | `ComputedRef<{ color: string; backgroundColor: string } \| null>` | Objeto de estilo pronto para uso |

## Limiar (Threshold Step)

| Propriedade | Tipo | Obrigatorio | Descricao |
|-------------|------|-------------|-----------|
| `min` | `number` | sim | Limite inferior (inclusivo) |
| `max` | `number` | sim | Limite superior (exclusivo) |
| `color` | `string` | sim | Cor de fundo |
| `textColor` | `string` | nao | Cor do texto |
| `label` | `string` | nao | Rotulo de exibicao |

## Configuracao

| Propriedade | Tipo | Padrao | Descricao |
|-------------|------|--------|-----------|
| `thresholds` | `IThresholdStep[]` | obrigatorio | Array de intervalos de limiares |
| `fallback` | `Partial<IThresholdStep>` | `{ color: '#9E9E9E', textColor: '#fff', label: 'unknown' }` | Usado quando nenhum limiar corresponde |

## Combinacao com progress-define

Combine com `@techmefr/progress-define` para obter cores dinamicas baseadas no progresso:

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

## Testes

Todos os modulos seguem as boas praticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automatica de atributos data-* em producao
- Helpers de teste para testes unitarios, de integracao e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licenca

MIT

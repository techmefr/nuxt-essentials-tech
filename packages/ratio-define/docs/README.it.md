🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/ratio-define

Un composable tipizzato per il tracciamento del rapporto per applicazioni Vue 3 e Nuxt. Definisci current e max — ottieni percentuale, rapporto, rimanente e stato di completamento reattivi.

Solo stato: tu controlli la UI. Il motore gestisce i valori.

## Installazione

```bash
pnpm add @techmefr/ratio-define
```

## Avvio rapido

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
    <span>{{ ratio.remaining.value }} rimanente</span>
</template>
```

## API

### `setCurrent(value)`

Imposta il valore corrente. Limitato tra 0 e max.

### `setMax(value)`

Aggiorna il valore massimo. Current viene limitato se supera il nuovo max.

### `reset()`

Reimposta current a 0.

### Proprietà calcolate

| Proprietà | Tipo | Descrizione |
|-----------|------|-------------|
| `current` | `Ref<number>` | Valore corrente |
| `max` | `Ref<number>` | Valore massimo |
| `percentage` | `ComputedRef<number>` | Valore come 0-100 (arrotondato, 0 decimali) |
| `ratio` | `ComputedRef<number>` | Valore come 0-1 (2 decimali) |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` quando `current >= max` |

## Config

| Proprietà | Tipo | Default | Descrizione |
|-----------|------|---------|-------------|
| `max` | `number` | richiesto | Valore massimo |
| `current` | `number` | `0` | Valore corrente iniziale |

## Licenza

MIT

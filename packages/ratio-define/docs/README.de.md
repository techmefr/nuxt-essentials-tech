🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/ratio-define

Ein typisiertes Verhältnis-Tracking-Composable für Vue 3 und Nuxt Anwendungen. Definiere current und max — erhalte reaktiven Prozentsatz, Verhältnis, Restwert und Abschlussstatus.

Nur Zustand: Sie steuern die UI. Die Engine verwaltet die Werte.

## Installation

```bash
pnpm add @techmefr/ratio-define
```

## Schnellstart

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
    <span>{{ ratio.remaining.value }} verbleibend</span>
</template>
```

## API

### `setCurrent(value)`

Setzt den aktuellen Wert. Begrenzt zwischen 0 und max.

### `setMax(value)`

Aktualisiert den Maximalwert. Current wird begrenzt, wenn er den neuen max überschreitet.

### `reset()`

Setzt current auf 0 zurück.

### Berechnete Eigenschaften

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `current` | `Ref<number>` | Aktueller Wert |
| `max` | `Ref<number>` | Maximalwert |
| `percentage` | `ComputedRef<number>` | Wert als 0-100 (gerundet, 0 Dezimalstellen) |
| `ratio` | `ComputedRef<number>` | Wert als 0-1 (2 Dezimalstellen) |
| `remaining` | `ComputedRef<number>` | `max - current` |
| `isComplete` | `ComputedRef<boolean>` | `true` wenn `current >= max` |

## Config

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|-------------|
| `max` | `number` | erforderlich | Maximalwert |
| `current` | `number` | `0` | Anfänglicher aktueller Wert |

## Lizenz

MIT

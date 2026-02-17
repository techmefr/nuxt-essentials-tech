🇬🇧 [English](./README.md) | 🇫🇷 [Français](./docs/README.fr.md) | 🇪🇸 [Español](./docs/README.es.md) | 🇩🇪 [Deutsch](./docs/README.de.md) | 🇮🇹 [Italiano](./docs/README.it.md) | 🇨🇳 [中文](./docs/README.zh.md) | 🇧🇷 [Português](./docs/README.pt.md)

# @techmefr/datetime-define

A collection of typed factory composables for date, datetime and date range pickers in Vue 3 and Nuxt applications. Powered by date-fns for locale-aware formatting and timezone support.

Three focused functions, one per use case — same pattern as `defineTable`.

## Installation

```bash
pnpm add @techmefr/datetime-define date-fns date-fns-tz
```

## defineDate

Simple date picker with validation and formatting.

```typescript
import { defineDate } from '@techmefr/datetime-define'
import { fr } from 'date-fns/locale'

const useBirthDate = defineDate<[]>(() => ({
    locale: fr,
    maxDate: new Date(),
}))
```

```vue
<script setup>
const { date, formatted, setDate, isValid, reset } = useBirthDate()
</script>

<template>
    <v-date-picker v-model="date" />
    <p>{{ formatted }}</p>
</template>
```

### Return

| Property | Type | Description |
|----------|------|-------------|
| `date` | `Ref<Date \| null>` | Selected date |
| `formatted` | `ComputedRef<string \| null>` | Formatted date string |
| `locale` | `Ref<Locale \| undefined>` | Current locale |
| `isValid` | `ComputedRef<boolean>` | Validation state |
| `setDate` | `(value: Date \| null) => void` | Set date |
| `setLocale` | `(value: Locale) => void` | Change locale |
| `setMinDate` / `setMaxDate` | `(value: Date \| null) => void` | Update limits |
| `reset` | `() => void` | Reset to null |

## defineDateTime

Date + time picker with combined computed and formatting.

```typescript
import { defineDateTime } from '@techmefr/datetime-define'

const useEventPicker = defineDateTime<[]>(() => ({
    minDate: new Date(),
}))
```

```vue
<script setup>
const { date, time, combined, formatted, setDateTime, isValid, reset } = useEventPicker()
</script>

<template>
    <v-date-picker v-model="date" />
    <v-time-picker v-model="time" />
    <p>{{ formatted }}</p>
</template>
```

### Return

Includes all `defineDate` properties plus:

| Property | Type | Description |
|----------|------|-------------|
| `time` | `Ref<string \| null>` | Time string (`HH:mm` or `HH:mm:ss`) |
| `combined` | `ComputedRef<Date \| null>` | Date + time merged |
| `setTime` | `(value: string \| null) => void` | Set time |
| `setDateTime` | `(date: Date \| null, time: string \| null) => void` | Set both |

## defineDateRange

Date range picker with start/end and formatted range.

```typescript
import { defineDateRange } from '@techmefr/datetime-define'

const useAvailability = defineDateRange<[]>(() => ({
    minDate: new Date(),
    separator: ' to ',
}))
```

```vue
<script setup>
const { start, end, formattedRange, setRange, isValid, reset } = useAvailability()
</script>

<template>
    <v-date-picker v-model="start" />
    <v-date-picker v-model="end" />
    <p>{{ formattedRange }}</p>
</template>
```

### Return

| Property | Type | Description |
|----------|------|-------------|
| `start` | `Ref<Date \| null>` | Range start |
| `end` | `Ref<Date \| null>` | Range end |
| `formattedStart` | `ComputedRef<string \| null>` | Formatted start |
| `formattedEnd` | `ComputedRef<string \| null>` | Formatted end |
| `formattedRange` | `ComputedRef<string \| null>` | Full formatted range |
| `setStart` / `setEnd` | `(value: Date \| null) => void` | Set dates |
| `setRange` | `(start: Date \| null, end: Date \| null) => void` | Set both |
| `setLocale` | `(value: Locale) => void` | Change locale |
| `setMinDate` / `setMaxDate` | `(value: Date \| null) => void` | Update limits |
| `reset` | `() => void` | Reset to null |

## Shared Config

All three functions accept the same base config:

| Property | Type | Description |
|----------|------|-------------|
| `locale` | `Locale` | date-fns locale for formatting |
| `timezone` | `string` | IANA timezone for formatting |
| `format` | `string` | date-fns format pattern (default: `PP` / `PPp`) |
| `minDate` | `Date \| null` | Minimum allowed date |
| `maxDate` | `Date \| null` | Maximum allowed date |

`defineDateRange` also accepts `separator` (default: `' - '`).

## Locale & Timezone

```typescript
import { fr, de } from 'date-fns/locale'

const useDatePicker = defineDate<[]>(() => ({
    locale: fr,
    timezone: 'Europe/Paris',
    format: 'PPP',
}))

const { formatted, setLocale } = useDatePicker()

setLocale(de)
```

The `formatted` computed reacts to locale changes. Use `setLocale()` to switch language dynamically.

## Dynamic Arguments

```typescript
const useEventPicker = defineDateTime<[Date]>(minDate => ({
    minDate,
}))

const picker = useEventPicker(new Date())
```

## Validation

`isValid` automatically checks:
- **defineDate**: date is not null, is a valid Date, within min/max bounds
- **defineDateTime**: combined is not null, within min/max bounds
- **defineDateRange**: start and end are not null, start <= end, within min/max bounds

## Testing

All modules follow testability best practices. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic cleanup of data-* attributes in production
- Testing helpers for unit, integration and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

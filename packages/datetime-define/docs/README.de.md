[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/datetime-define

Eine Sammlung typisierter Factory-Composables für Datums-, Datetime- und Datumsbereich-Picker in Vue 3 und Nuxt Anwendungen. Unterstützt durch date-fns für lokalisierte Formatierung und Zeitzonen.

Drei fokussierte Funktionen, eine pro Anwendungsfall — gleiches Muster wie `defineTable`.

## Installation

```bash
pnpm add @techmefr/datetime-define date-fns date-fns-tz
```

## defineDate

Einfacher Datums-Picker mit Validierung und Formatierung.

```typescript
import { defineDate } from '@techmefr/datetime-define'
import { fr } from 'date-fns/locale'

const useBirthDate = defineDate<[]>(() => ({
    locale: fr,
    maxDate: new Date(),
}))
```

## defineDateTime

Datum + Zeit Picker mit kombiniertem Computed und Formatierung.

```typescript
import { defineDateTime } from '@techmefr/datetime-define'

const useEventPicker = defineDateTime<[]>(() => ({
    minDate: new Date(),
}))
```

## defineDateRange

Datumsbereich-Picker mit Start/Ende und formatiertem Bereich.

```typescript
import { defineDateRange } from '@techmefr/datetime-define'

const useAvailability = defineDateRange<[]>(() => ({
    minDate: new Date(),
    separator: ' to ',
}))
```

## Locale und Zeitzone

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

Das `formatted` Computed reagiert auf Locale-Änderungen. Verwende `setLocale()` um die Sprache dynamisch zu wechseln.

## Dynamische Argumente

```typescript
const useEventPicker = defineDateTime<[Date]>(minDate => ({
    minDate,
}))

const picker = useEventPicker(new Date())
```

## Validierung

`isValid` prüft automatisch:
- **defineDate**: Datum nicht null, gültiges Date, innerhalb der min/max-Grenzen
- **defineDateTime**: combined nicht null, innerhalb der min/max-Grenzen
- **defineDateRange**: start und end nicht null, start <= end, innerhalb der min/max-Grenzen

## Testing

Alle Module folgen Best Practices für Testbarkeit. Verwende [@techmefr/Datapower](https://github.com/techmefr/Datapower) für:
- Automatische Bereinigung von data-* Attributen in Produktion
- Test-Helpers für Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

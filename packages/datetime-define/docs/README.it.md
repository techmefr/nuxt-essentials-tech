[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/datetime-define

Una collezione di composable factory tipizzati per picker di date, datetime e intervalli di date in applicazioni Vue 3 e Nuxt. Alimentato da date-fns per la formattazione localizzata e il supporto dei fusi orari.

Tre funzioni mirate, una per caso d'uso — stesso pattern di `defineTable`.

## Installazione

```bash
pnpm add @techmefr/datetime-define date-fns date-fns-tz
```

## defineDate

Picker di data semplice con validazione e formattazione.

```typescript
import { defineDate } from '@techmefr/datetime-define'
import { fr } from 'date-fns/locale'

const useBirthDate = defineDate<[]>(() => ({
    locale: fr,
    maxDate: new Date(),
}))
```

## defineDateTime

Picker data + ora con computed combinato e formattazione.

```typescript
import { defineDateTime } from '@techmefr/datetime-define'

const useEventPicker = defineDateTime<[]>(() => ({
    minDate: new Date(),
}))
```

## defineDateRange

Picker di intervallo di date con start/end e intervallo formattato.

```typescript
import { defineDateRange } from '@techmefr/datetime-define'

const useAvailability = defineDateRange<[]>(() => ({
    minDate: new Date(),
    separator: ' to ',
}))
```

## Locale e fuso orario

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

Il computed `formatted` reagisce ai cambiamenti di locale. Usa `setLocale()` per cambiare lingua dinamicamente.

## Argomenti dinamici

```typescript
const useEventPicker = defineDateTime<[Date]>(minDate => ({
    minDate,
}))

const picker = useEventPicker(new Date())
```

## Validazione

`isValid` verifica automaticamente:
- **defineDate**: data non null, Date valido, entro i limiti min/max
- **defineDateTime**: combined non null, entro i limiti min/max
- **defineDateRange**: start e end non null, start <= end, entro i limiti min/max

## Testing

Tutti i moduli seguono le best practice per la testabilità. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) per:
- Pulizia automatica degli attributi data-* in produzione
- Helper di test per test unitari, di integrazione e E2E
- Approccio standardizzato con data-test-id, data-test-class, data-state

## Licenza

MIT

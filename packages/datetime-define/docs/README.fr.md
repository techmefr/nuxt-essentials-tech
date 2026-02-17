[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/datetime-define

Une collection de composables factory typés pour les pickers de date, datetime et plage de dates dans les applications Vue 3 et Nuxt. Propulsé par date-fns pour le formatage localisé et le support des fuseaux horaires.

Trois fonctions ciblées, une par cas d'usage — même pattern que `defineTable`.

## Installation

```bash
pnpm add @techmefr/datetime-define date-fns date-fns-tz
```

## defineDate

Picker de date simple avec validation et formatage.

```typescript
import { defineDate } from '@techmefr/datetime-define'
import { fr } from 'date-fns/locale'

const useBirthDate = defineDate<[]>(() => ({
    locale: fr,
    maxDate: new Date(),
}))
```

## defineDateTime

Picker date + heure avec computed combiné et formatage.

```typescript
import { defineDateTime } from '@techmefr/datetime-define'

const useEventPicker = defineDateTime<[]>(() => ({
    minDate: new Date(),
}))
```

## defineDateRange

Picker de plage de dates avec start/end et plage formatée.

```typescript
import { defineDateRange } from '@techmefr/datetime-define'

const useAvailability = defineDateRange<[]>(() => ({
    minDate: new Date(),
    separator: ' to ',
}))
```

## Locale et fuseau horaire

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

Le computed `formatted` réagit aux changements de locale. Utilisez `setLocale()` pour changer de langue dynamiquement.

## Arguments dynamiques

```typescript
const useEventPicker = defineDateTime<[Date]>(minDate => ({
    minDate,
}))

const picker = useEventPicker(new Date())
```

## Validation

`isValid` vérifie automatiquement :
- **defineDate** : date non null, Date valide, dans les limites min/max
- **defineDateTime** : combined non null, dans les limites min/max
- **defineDateRange** : start et end non null, start <= end, dans les limites min/max

## Testing

Tous les modules suivent les bonnes pratiques de testabilité. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour tests unitaires, d'intégration et E2E
- Approche standardisée avec data-test-id, data-test-class, data-state

## Licence

MIT

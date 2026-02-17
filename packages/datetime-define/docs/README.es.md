[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/datetime-define

Una colección de composables factory tipados para pickers de fecha, datetime y rango de fechas en aplicaciones Vue 3 y Nuxt. Impulsado por date-fns para formateo con locale y soporte de zonas horarias.

Tres funciones enfocadas, una por caso de uso — mismo patrón que `defineTable`.

## Instalación

```bash
pnpm add @techmefr/datetime-define date-fns date-fns-tz
```

## defineDate

Picker de fecha simple con validación y formateo.

```typescript
import { defineDate } from '@techmefr/datetime-define'
import { fr } from 'date-fns/locale'

const useBirthDate = defineDate<[]>(() => ({
    locale: fr,
    maxDate: new Date(),
}))
```

## defineDateTime

Picker de fecha + hora con computed combinado y formateo.

```typescript
import { defineDateTime } from '@techmefr/datetime-define'

const useEventPicker = defineDateTime<[]>(() => ({
    minDate: new Date(),
}))
```

## defineDateRange

Picker de rango de fechas con start/end y rango formateado.

```typescript
import { defineDateRange } from '@techmefr/datetime-define'

const useAvailability = defineDateRange<[]>(() => ({
    minDate: new Date(),
    separator: ' to ',
}))
```

## Locale y zona horaria

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

El computed `formatted` reacciona a los cambios de locale. Usa `setLocale()` para cambiar el idioma dinámicamente.

## Argumentos dinámicos

```typescript
const useEventPicker = defineDateTime<[Date]>(minDate => ({
    minDate,
}))

const picker = useEventPicker(new Date())
```

## Validación

`isValid` verifica automáticamente:
- **defineDate**: fecha no null, Date válido, dentro de los límites min/max
- **defineDateTime**: combined no null, dentro de los límites min/max
- **defineDateRange**: start y end no null, start <= end, dentro de los límites min/max

## Testing

Todos los módulos siguen las mejores prácticas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automática de atributos data-* en producción
- Helpers de testing para pruebas unitarias, de integración y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

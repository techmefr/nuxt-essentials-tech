[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/datetime-define

Uma coleção de composables factory tipados para pickers de data, datetime e intervalo de datas em aplicações Vue 3 e Nuxt. Alimentado por date-fns para formatação localizada e suporte a fusos horários.

Três funções focadas, uma por caso de uso — mesmo padrão que `defineTable`.

## Instalação

```bash
pnpm add @techmefr/datetime-define date-fns date-fns-tz
```

## defineDate

Picker de data simples com validação e formatação.

```typescript
import { defineDate } from '@techmefr/datetime-define'
import { fr } from 'date-fns/locale'

const useBirthDate = defineDate<[]>(() => ({
    locale: fr,
    maxDate: new Date(),
}))
```

## defineDateTime

Picker de data + hora com computed combinado e formatação.

```typescript
import { defineDateTime } from '@techmefr/datetime-define'

const useEventPicker = defineDateTime<[]>(() => ({
    minDate: new Date(),
}))
```

## defineDateRange

Picker de intervalo de datas com start/end e intervalo formatado.

```typescript
import { defineDateRange } from '@techmefr/datetime-define'

const useAvailability = defineDateRange<[]>(() => ({
    minDate: new Date(),
    separator: ' to ',
}))
```

## Locale e fuso horário

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

O computed `formatted` reage a mudanças de locale. Use `setLocale()` para trocar o idioma dinamicamente.

## Argumentos dinâmicos

```typescript
const useEventPicker = defineDateTime<[Date]>(minDate => ({
    minDate,
}))

const picker = useEventPicker(new Date())
```

## Validação

`isValid` verifica automaticamente:
- **defineDate**: data não null, Date válido, dentro dos limites min/max
- **defineDateTime**: combined não null, dentro dos limites min/max
- **defineDateRange**: start e end não null, start <= end, dentro dos limites min/max

## Testing

Todos os módulos seguem as melhores práticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automática de atributos data-* em produção
- Helpers de teste para testes unitários, de integração e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licença

MIT

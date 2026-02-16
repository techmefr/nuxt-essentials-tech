[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/debounce

Utility debounce e composable per applicazioni Vue.

## Installazione

```bash
pnpm add @techmefr/debounce
```

## Utilizzo

### Utility debounce semplice

```typescript
import { debounce } from '@techmefr/debounce'

const search = debounce((query: string) => {
    api.search(query)
}, 500)

search('test')
search.cancel()
```

### Con opzioni

```typescript
const save = debounce(
    (data: FormData) => api.save(data),
    { 
        delay: 300, 
        leading: true, 
        trailing: false 
    }
)
```

### Composable Vue

```typescript
import { useDebounce } from '@techmefr/debounce'

const { execute, cancel, isPending } = useDebounce(
    async (query: string) => {
        return await api.search(query)
    },
    { delay: 500 }
)

await execute('test')
cancel()
```

## API

### debounce

```typescript
function debounce<TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    delayOrOptions: number | IDebounceOptions
): IDebouncedFunction<TArgs>
```

### useDebounce

```typescript
function useDebounce<TArgs extends unknown[], TReturn>(
    fn: (...args: TArgs) => Promise<TReturn> | TReturn,
    options?: IDebounceOptions
): IUseDebounceReturn<TArgs, TReturn>
```

### Options

```typescript
interface IDebounceOptions {
    delay?: number
    leading?: boolean
    trailing?: boolean
}
```

## Testing

Tutti i moduli seguono le best practice per la testabilità. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) per:
- Pulizia automatica degli attributi data-* in produzione
- Helper di test per test unitari, di integrazione e E2E
- Approccio standardizzato con data-test-id, data-test-class, data-state

## Licenza

MIT

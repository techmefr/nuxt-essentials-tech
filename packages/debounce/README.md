[🇬🇧 English](./README.md) | [🇫🇷 Français](./docs/README.fr.md) | [🇪🇸 Español](./docs/README.es.md) | [🇩🇪 Deutsch](./docs/README.de.md) | [🇮🇹 Italiano](./docs/README.it.md) | [🇨🇳 中文](./docs/README.zh.md) | [🇧🇷 Português](./docs/README.pt.md)

# @techmefr/debounce

Debounce utility and composable for Vue applications.

## Installation

```bash
pnpm add @techmefr/debounce
```

## Usage

### Simple debounce utility

```typescript
import { debounce } from '@techmefr/debounce'

const search = debounce((query: string) => {
    api.search(query)
}, 500)

search('test')
search.cancel()
```

### With options

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

### Vue composable

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

All modules follow best practices for testability. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic data-* attributes cleanup in production
- Testing helpers for unit, integration, and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/debounce

Utilitário debounce e composable para aplicações Vue.

## Instalação

```bash
pnpm add @techmefr/debounce
```

## Uso

### Utilitário debounce simples

```typescript
import { debounce } from '@techmefr/debounce'

const search = debounce((query: string) => {
    api.search(query)
}, 500)

search('test')
search.cancel()
```

### Com opções

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

Todos os módulos seguem as melhores práticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automática de atributos data-* em produção
- Helpers de teste para testes unitários, de integração e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licença

MIT

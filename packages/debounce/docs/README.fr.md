[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/debounce

Utilitaire debounce et composable pour applications Vue.

## Installation

```bash
pnpm add @techmefr/debounce
```

## Utilisation

### Utilitaire debounce simple

```typescript
import { debounce } from '@techmefr/debounce'

const search = debounce((query: string) => {
    api.search(query)
}, 500)

search('test')
search.cancel()
```

### Avec options

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

## Tests

Tous les modules suivent les bonnes pratiques de testabilité. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'intégration et E2E
- Approche standardisée avec data-test-id, data-test-class, data-state

## Licence

MIT

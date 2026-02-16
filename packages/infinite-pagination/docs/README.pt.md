[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/infinite-pagination

Composable para paginação infinita em aplicações Vue.

## Instalação

```bash
pnpm add @techmefr/infinite-pagination
```

## Uso

### Definir um composable

```typescript
import { defineInfinitePagination } from '@techmefr/infinite-pagination'

interface IUser {
    id: number
    name: string
    email: string
}

export const useUsersPagination = defineInfinitePagination<[], IUser>(() => ({
    load: async (page) => {
        const res = await api.get('/users', { 
            params: { page, limit: 20 } 
        })
        return {
            items: res.data.users,
            hasMore: res.data.hasMore,
            total: res.data.total,
        }
    },
    pageSize: 20,
}))
```

### Usar em um componente

```vue
<script setup lang="ts">
const { items, loadMore, hasMore, isLoading, refresh } = useUsersPagination()

onMounted(() => {
    loadMore()
})
</script>

<template>
    <div>
        <div v-for="user in items" :key="user.id">
            {{ user.name }}
        </div>

        <button 
            v-if="hasMore" 
            @click="loadMore"
            :disabled="isLoading"
        >
            Load More
        </button>
    </div>
</template>
```

## API

### Config

```typescript
interface IInfinitePaginationConfig<T> {
    load: (page: number) => Promise<IInfinitePaginationLoadResult<T>>
    pageSize?: number
    initialPage?: number
    onError?: (error: Error) => void
}
```

### Return

```typescript
interface IInfinitePaginationReturn<T> {
    items: Ref<T[]>
    total: Ref<number | undefined>
    currentPage: Ref<number>
    hasMore: Ref<boolean>
    isLoading: Ref<boolean>
    loadMore: () => Promise<void>
    reset: () => void
    refresh: () => Promise<void>
}
```

## Testing

Todos os módulos seguem as melhores práticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automática de atributos data-* em produção
- Helpers de teste para testes unitários, de integração e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licença

MIT

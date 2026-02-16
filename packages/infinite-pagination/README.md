[🇬🇧 English](./README.md) | [🇫🇷 Français](./docs/README.fr.md) | [🇪🇸 Español](./docs/README.es.md) | [🇩🇪 Deutsch](./docs/README.de.md) | [🇮🇹 Italiano](./docs/README.it.md) | [🇨🇳 中文](./docs/README.zh.md) | [🇧🇷 Português](./docs/README.pt.md)

# @techmefr/infinite-pagination

Composable for infinite pagination in Vue applications.

## Installation

```bash
pnpm add @techmefr/infinite-pagination
```

## Usage

### Define composable

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

### Use in component

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

All modules follow best practices for testability. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic data-* attributes cleanup in production
- Testing helpers for unit, integration, and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

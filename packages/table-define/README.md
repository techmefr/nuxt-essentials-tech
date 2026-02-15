[🇬🇧 English](./README.md) | [🇫🇷 Français](./docs/README.fr.md) | [🇪🇸 Español](./docs/README.es.md) | [🇩🇪 Deutsch](./docs/README.de.md) | [🇮🇹 Italiano](./docs/README.it.md) | [🇨🇳 中文](./docs/README.zh.md) | [🇧🇷 Português](./docs/README.pt.md)

# @techmefr/table-define

Industrial module for Vuetify tables with reactive refs and automatic watch.

## Installation

```bash
pnpm add @techmefr/table-define
```

## Usage

### Define composable

```typescript
import { defineTable } from '@techmefr/table-define'

interface IUser {
    id: number
    name: string
    email: string
}

export const useUserTable = defineTable<[string], IUser>(status => ({
    load: async ({ page, itemsPerPage, search, sorts, filters }) => {
        const res = await api.get('/users', {
            params: { page, limit: itemsPerPage, search, status, ...filters }
        })
        return { items: res.data.users, total: res.data.total }
    },
    itemsPerPage: 25,
}))
```

### Use in component

```vue
<script setup lang="ts">
const { items, page, itemsPerPage, sorts, search, total, isLoading, refresh } = useUserTable('active')

const headers = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Email', key: 'email' },
]
</script>

<template>
    <v-text-field v-model="search" label="Search" />

    <v-data-table-server
        :items="items"
        :headers="headers"
        :items-length="total"
        :loading="isLoading"
        v-model:page="page"
        v-model:items-per-page="itemsPerPage"
        v-model:sort-by="sorts"
    />
</template>
```

## API

### Config

```typescript
interface ITableConfig<T> {
    load: (body: ITableBody) => Promise<{ items: T[]; total: number }>
    itemsPerPage?: number
    watch?: boolean
    debounceMs?: number
    minSearchLength?: number
    onError?: (error: Error) => void
}
```

### Return

```typescript
interface ITableReturn<T> {
    items: Ref<T[]>
    total: Ref<number>
    isLoading: Ref<boolean>
    page: Ref<number>
    itemsPerPage: Ref<number>
    sorts: Ref<ITableSort[]>
    search: Ref<string>
    filters: Ref<Record<string, unknown>>
    refresh: () => Promise<void>
    reset: () => void
}
```

## Features

### Auto watch

Enabled by default with 500ms debounce and 2 characters minimum for search.

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    debounceMs: 300,
    minSearchLength: 3,
}))
```

### Error handling

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    onError: (error) => {
        console.error('Error:', error)
    },
}))
```

### Dynamic arguments

```typescript
const useUserTable = defineTable<[string, number], IUser>((status, companyId) => ({
    load: async body => fetchUsers(body, status, companyId),
}))

const table = useUserTable('active', 123)
```

## Testing

All modules follow best practices for testability. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic data-* attributes cleanup in production
- Testing helpers for unit, integration, and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

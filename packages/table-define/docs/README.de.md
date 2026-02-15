[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/table-define

Industrielles Modul f\u00fcr Vuetify-Tabellen mit reaktiven Refs und automatischem Watch.

## Installation

```bash
pnpm add @techmefr/table-define
```

## Verwendung

### Composable definieren

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

### In einer Komponente verwenden

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

### Konfiguration

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

### R\u00fcckgabe

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

## Funktionen

### Automatischer Watch

Standardm\u00e4\u00dfig aktiviert mit 500ms Debounce und mindestens 2 Zeichen f\u00fcr die Suche.

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    debounceMs: 300,
    minSearchLength: 3,
}))
```

### Fehlerbehandlung

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    onError: (error) => {
        console.error('Error:', error)
    },
}))
```

### Dynamische Argumente

```typescript
const useUserTable = defineTable<[string, number], IUser>((status, companyId) => ({
    load: async body => fetchUsers(body, status, companyId),
}))

const table = useUserTable('active', 123)
```

## Testing

Alle Module folgen Best Practices für Testbarkeit. Verwende [@techmefr/Datapower](https://github.com/techmefr/Datapower) für:
- Automatische Bereinigung von data-* Attributen in Produktion
- Test-Helpers für Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

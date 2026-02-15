[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/table-define

Module industriel pour les tables Vuetify avec refs r\u00e9actives et watch automatique.

## Installation

```bash
pnpm add @techmefr/table-define
```

## Utilisation

### D\u00e9finir un composable

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

### Utiliser dans un composant

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

### Configuration

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

### Retour

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

## Fonctionnalit\u00e9s

### Watch automatique

Activ\u00e9 par d\u00e9faut avec un debounce de 500ms et un minimum de 2 caract\u00e8res pour la recherche.

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    debounceMs: 300,
    minSearchLength: 3,
}))
```

### Gestion des erreurs

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    onError: (error) => {
        console.error('Error:', error)
    },
}))
```

### Arguments dynamiques

```typescript
const useUserTable = defineTable<[string, number], IUser>((status, companyId) => ({
    load: async body => fetchUsers(body, status, companyId),
}))

const table = useUserTable('active', 123)
```

## Tests

Tous les modules suivent les bonnes pratiques de testabilité. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'intégration et E2E
- Approche standardisée avec data-test-id, data-test-class, data-state

## Licence

MIT

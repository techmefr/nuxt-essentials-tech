[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/table-define

M\u00f3dulo industrial para tabelas Vuetify com refs reativas e watch autom\u00e1tico.

## Instala\u00e7\u00e3o

```bash
pnpm add @techmefr/table-define
```

## Uso

### Definir um composable

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

### Usar em um componente

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

### Configura\u00e7\u00e3o

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

### Retorno

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

## Funcionalidades

### Watch autom\u00e1tico

Ativado por padr\u00e3o com debounce de 500ms e m\u00ednimo de 2 caracteres para pesquisa.

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    debounceMs: 300,
    minSearchLength: 3,
}))
```

### Tratamento de erros

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    onError: (error) => {
        console.error('Error:', error)
    },
}))
```

### Argumentos din\u00e2micos

```typescript
const useUserTable = defineTable<[string, number], IUser>((status, companyId) => ({
    load: async body => fetchUsers(body, status, companyId),
}))

const table = useUserTable('active', 123)
```

## Testing

Todos os módulos seguem as melhores práticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automática de atributos data-* em produção
- Helpers de teste para testes unitários, de integração e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state


## Licen\u00e7a

MIT

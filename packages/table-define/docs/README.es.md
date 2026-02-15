[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/table-define

M\u00f3dulo industrial para tablas Vuetify con refs reactivas y watch autom\u00e1tico.

## Instalaci\u00f3n

```bash
pnpm add @techmefr/table-define
```

## Uso

### Definir un composable

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

### Usar en un componente

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

### Configuraci\u00f3n

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

## Caracter\u00edsticas

### Watch autom\u00e1tico

Activado por defecto con debounce de 500ms y un m\u00ednimo de 2 caracteres para la b\u00fasqueda.

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    debounceMs: 300,
    minSearchLength: 3,
}))
```

### Manejo de errores

```typescript
const useUserTable = defineTable<[], IUser>(() => ({
    load: fetchUsers,
    onError: (error) => {
        console.error('Error:', error)
    },
}))
```

### Argumentos din\u00e1micos

```typescript
const useUserTable = defineTable<[string, number], IUser>((status, companyId) => ({
    load: async body => fetchUsers(body, status, companyId),
}))

const table = useUserTable('active', 123)
```

## Testing

Todos los módulos siguen las mejores prácticas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automática de atributos data-* en producción
- Helpers de testing para pruebas unitarias, de integración y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

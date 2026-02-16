[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/infinite-pagination

用于 Vue 应用的无限分页 Composable。

## 安装

```bash
pnpm add @techmefr/infinite-pagination
```

## 使用

### 定义 composable

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

### 在组件中使用

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

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower) 实现：
- 生产环境自动清理 data-* 属性
- 单元测试、集成测试和 E2E 测试的测试工具
- 使用 data-test-id、data-test-class、data-state 的标准化方案

## 许可证

MIT

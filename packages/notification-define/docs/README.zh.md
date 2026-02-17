[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/notification-define

一个面向 Vue 3 和 Nuxt 应用的强类型、基于 slug 的通知引擎。按通知类型定义预设，支持堆叠或替换、自动消除、去重，并管理完整的生命周期，包括基于 Promise 的通知。

仅管理状态：你控制 UI（v-snackbar、v-alert、自定义组件）。引擎管理队列。

## 安装

```bash
pnpm add @techmefr/notification-define
```

## 快速开始

```typescript
import { defineSnackConfig } from '@techmefr/notification-define'

const useSnack = defineSnackConfig<[]>(() => ({
    presets: {
        success: { color: '#4CAF50', textColor: '#fff', icon: 'mdi-check-circle', timeout: 3000 },
        error: { color: '#F44336', textColor: '#fff', icon: 'mdi-alert-circle', timeout: 0 },
        warning: { color: '#FF9800', textColor: '#fff', icon: 'mdi-alert', timeout: 5000 },
        info: { color: '#2196F3', textColor: '#fff', icon: 'mdi-information', timeout: 4000 },
    },
}))
```

```vue
<script setup>
const snack = useSnack()

snack.success('Item saved')
snack.error('Network error', {
    actions: [{ label: 'Retry', handler: () => retry() }],
})
</script>

<template>
    <v-snackbar
        v-for="item in snack.items.value"
        :key="item.id"
        :model-value="!item.isClosing"
        :color="item.preset.color"
        :timeout="-1"
        @update:model-value="snack.dismiss(item.id)"
    >
        <component v-if="typeof item.content !== 'string'" :is="item.content" v-bind="item.contentProps" />
        <span v-else>{{ item.content }}</span>
    </v-snackbar>
</template>
```

## Slug 预设

`presets` 中的每个键成为一个通知类型，拥有自己的样式和行为。

| 属性 | 类型 | 描述 |
|------|------|------|
| `color` | `string` | 背景颜色 |
| `textColor` | `string` | 文字颜色 |
| `linkColor` | `string` | 链接颜色 |
| `icon` | `string` | 图标名称（如 `mdi-check-circle`） |
| `elevation` | `number` | Vuetify 阴影 |
| `variant` | `string` | Vuetify 变体 |
| `timeout` | `number` | 自动消除延迟（毫秒），`0` = 持久 |
| `position` | `SnackPosition` | 屏幕位置 |
| `stacking` | `boolean` | `true` = 堆叠，`false` = 替换相同 slug |
| `closable` | `boolean` | 显示关闭按钮 |
| `priority` | `number` | 显示顺序（越高越靠前） |

## API

### `show(slug, content, overrides?)`

根方法。返回通知 ID。

```typescript
const id = snack.show('error', 'Something went wrong', {
    actions: [{ label: 'Retry', handler: retryFn, color: 'white' }],
    isPersistent: true,
})
```

### 动态快捷方式

快捷方法从预设键自动生成：

```typescript
snack.success('Saved')
snack.error('Failed')
snack.warning('Check your input')
snack.info('New version available')
```

### `promise(promise, handlers)`

通过单个通知管理 Promise 生命周期。

```typescript
snack.promise(fetchUser(id), {
    pending: { slug: 'info', content: 'Loading user...' },
    success: { content: result => `Welcome ${result.name}` },
    error: { content: err => `Failed: ${err.message}` },
})
```

### `dismiss(id)`

通过 ID 移除特定通知。

### `closeAll()`

将所有通知标记为关闭中（`isClosing: true`）。UI 层处理退出动画，然后调用 `dismiss(id)`。

### `dismissAll()`

立即移除所有通知。

### `clearZone(slug)`

移除指定 slug 的所有通知。

### `update(id, options)`

更新现有通知而不重建。

```typescript
snack.update(id, { content: 'Updated message', slug: 'success' })
```

## 组件内容

传递 Vue 组件代替字符串：

```typescript
import MyErrorCard from './MyErrorCard.vue'

snack.show('error', MyErrorCard, {
    contentProps: { message: 'Disk full', link: '/settings' },
})
```

## 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `presets` | `Record<string, ISnackPreset>` | required | Slug 定义 |
| `maxStack` | `number` | `10` | 最大可见通知数 |
| `defaultTimeout` | `number` | `5000` | 默认超时（毫秒） |
| `deduplicate` | `boolean` | `false` | 防止重复消息 |
| `deduplicateInterval` | `number` | `1000` | 去重窗口（毫秒） |

## 多实例

```typescript
const useToasts = defineSnackConfig<[]>(() => ({ presets: { success: {...}, error: {...} } }))
const useBanners = defineSnackConfig<[]>(() => ({ presets: { announcement: { timeout: 0, position: 'top-center' } } }))
```

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower) 实现：
- 生产环境自动清理 data-* 属性
- 单元测试、集成测试和 E2E 测试的测试工具
- 使用 data-test-id、data-test-class、data-state 的标准化方案

## 许可证

MIT

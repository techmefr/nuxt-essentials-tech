🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/clipboard-define

Vue 3 和 Nuxt 应用的类型化剪贴板组合式函数。文本复制、打开 tel: 和 mailto: 链接，具有响应式反馈状态。

仅状态：您控制界面（v-btn、v-icon、自定义组件）。引擎管理剪贴板操作。

## 安装

```bash
pnpm add @techmefr/clipboard-define
```

## 快速开始

```typescript
import { defineClipboard } from '@techmefr/clipboard-define'

const useClipboard = defineClipboard<[]>(() => ({
    resetDelay: 2000,
}))
```

```vue
<script setup>
const clipboard = useClipboard()

async function handleCopy() {
    await clipboard.copy('Hello world')
}
</script>

<template>
    <v-btn @click="handleCopy">
        {{ clipboard.isCopied.value ? '已复制！' : '复制' }}
    </v-btn>
</template>
```

## API

### `copy(text)`

将文本复制到剪贴板。成功返回 `true`，失败返回 `false`。

```typescript
await clipboard.copy('Hello world')
clipboard.lastType.value // 'text'
```

### `tel(number)`

将号码复制到剪贴板并打开 tel: 链接。

```typescript
await clipboard.tel('+33 6 12 34 56 78')
clipboard.lastType.value // 'tel'
```

### `mail(email)`

将邮箱复制到剪贴板并打开 mailto: 链接。

```typescript
await clipboard.mail('contact@example.com')
clipboard.lastType.value // 'mail'
```

### `reset()`

将所有状态重置为初始值。

```typescript
clipboard.reset()
```

### 响应式属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `isCopied` | `Ref<boolean>` | 最近一次复制是否成功（`resetDelay` 后自动重置） |
| `lastValue` | `Ref<string \| null>` | 上次复制的值 |
| `lastType` | `Ref<ClipboardType \| null>` | 上次复制的类型：`'text'`、`'tel'` 或 `'mail'` |

## 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `resetDelay` | `number` | `2000` | `isCopied` 重置为 `false` 前的延迟（毫秒） |

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower)：
- 生产环境自动清理 data-* 属性
- 单元测试、集成测试和 E2E 测试辅助工具
- 使用 data-test-id、data-test-class、data-state 的标准化方法

## 许可证

MIT

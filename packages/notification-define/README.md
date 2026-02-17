🇬🇧 [English](./README.md) | 🇫🇷 [Français](./docs/README.fr.md) | 🇪🇸 [Español](./docs/README.es.md) | 🇩🇪 [Deutsch](./docs/README.de.md) | 🇮🇹 [Italiano](./docs/README.it.md) | 🇨🇳 [中文](./docs/README.zh.md) | 🇧🇷 [Português](./docs/README.pt.md)

# @techmefr/notification-define

A typed, slug-based notification engine for Vue 3 and Nuxt applications. Define presets per notification type, stack or replace, auto-dismiss, deduplicate, and manage the full lifecycle — including promise-driven notifications.

State-only: you control the UI (v-snackbar, v-alert, custom components). The engine manages the queue.

## Installation

```bash
pnpm add @techmefr/notification-define
```

## Quick Start

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

## Slug Presets

Each key in `presets` becomes a notification type with its own style and behavior.

| Property | Type | Description |
|----------|------|-------------|
| `color` | `string` | Background color |
| `textColor` | `string` | Text color |
| `linkColor` | `string` | Link color |
| `icon` | `string` | Icon name (e.g. `mdi-check-circle`) |
| `elevation` | `number` | Vuetify elevation |
| `variant` | `string` | Vuetify variant |
| `timeout` | `number` | Auto-dismiss delay in ms (`0` = persistent) |
| `position` | `SnackPosition` | Screen position |
| `stacking` | `boolean` | `true` = stack, `false` = replace same slug |
| `closable` | `boolean` | Show close button |
| `priority` | `number` | Display order (higher = first) |

## API

### `show(slug, content, overrides?)`

Root method. Returns the notification ID.

```typescript
const id = snack.show('error', 'Something went wrong', {
    actions: [{ label: 'Retry', handler: retryFn, color: 'white' }],
    isPersistent: true,
})
```

### Dynamic shortcuts

Shortcut methods are generated from preset keys:

```typescript
snack.success('Saved')
snack.error('Failed')
snack.warning('Check your input')
snack.info('New version available')
```

### `promise(promise, handlers)`

Manages a promise lifecycle through a single notification.

```typescript
snack.promise(fetchUser(id), {
    pending: { slug: 'info', content: 'Loading user...' },
    success: { content: result => `Welcome ${result.name}` },
    error: { content: err => `Failed: ${err.message}` },
})
```

### `dismiss(id)`

Remove a specific notification by ID.

### `closeAll()`

Flag all notifications as closing (`isClosing: true`). The UI layer handles the exit animation, then calls `dismiss(id)`.

### `dismissAll()`

Remove all notifications instantly.

### `clearZone(slug)`

Remove all notifications of a given slug.

### `update(id, options)`

Update an existing notification without recreating it.

```typescript
snack.update(id, { content: 'Updated message', slug: 'success' })
```

## Component Content

Pass Vue components instead of strings:

```typescript
import MyErrorCard from './MyErrorCard.vue'

snack.show('error', MyErrorCard, {
    contentProps: { message: 'Disk full', link: '/settings' },
})
```

## Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `presets` | `Record<string, ISnackPreset>` | required | Slug definitions |
| `maxStack` | `number` | `10` | Max visible notifications |
| `defaultTimeout` | `number` | `5000` | Fallback timeout in ms |
| `deduplicate` | `boolean` | `false` | Prevent duplicate messages |
| `deduplicateInterval` | `number` | `1000` | Dedup window in ms |

## Multiple Instances

Each call to `defineSnackConfig` creates a fully isolated composable with its own queue, timers, presets and shortcuts. This lets you separate notification concerns: toasts for user feedback, banners for system alerts, etc.

```typescript
// composables/useToast.ts
const useToast = defineSnackConfig<[]>(() => ({
    presets: {
        success: { color: '#4CAF50', icon: 'mdi-check-circle', timeout: 3000 },
        error: { color: '#F44336', icon: 'mdi-alert-circle', timeout: 0 },
    },
}))

// composables/useAlert.ts
const useAlert = defineSnackConfig<[]>(() => ({
    presets: {
        announcement: { color: '#2196F3', timeout: 0, position: 'top-center' },
        maintenance: { color: '#FF9800', timeout: 10000, position: 'top-center' },
    },
}))
```

```vue
<script setup>
const toast = useToast()
const alert = useAlert()

toast.success('File saved')
alert.announcement('Scheduled maintenance at 10pm')
</script>

<template>
    <v-snackbar
        v-for="item in toast.items.value"
        :key="item.id"
        :model-value="!item.isClosing"
        :color="item.preset.color"
        :timeout="-1"
        @update:model-value="toast.dismiss(item.id)"
    >
        <span>{{ item.content }}</span>
    </v-snackbar>

    <v-banner
        v-for="item in alert.items.value"
        :key="item.id"
        :color="item.preset.color"
    >
        {{ item.content }}
        <template #actions>
            <v-btn @click="alert.dismiss(item.id)">Close</v-btn>
        </template>
    </v-banner>
</template>
```

Each instance is fully independent:

| | `useToast()` | `useAlert()` |
|---|---|---|
| `items` | own list | own list |
| timers | own timers | own timers |
| presets | `success`, `error` | `announcement`, `maintenance` |
| shortcuts | `toast.success()`, `toast.error()` | `alert.announcement()`, `alert.maintenance()` |
| `dismissAll()` | clears toasts only | clears alerts only |
| config | own maxStack, dedup | own maxStack, dedup |

## Testing

All modules follow testability best practices. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic cleanup of data-* attributes in production
- Testing helpers for unit, integration and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

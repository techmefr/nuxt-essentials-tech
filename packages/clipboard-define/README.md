🇬🇧 [English](./README.md) | 🇫🇷 [Français](./docs/README.fr.md) | 🇪🇸 [Español](./docs/README.es.md) | 🇩🇪 [Deutsch](./docs/README.de.md) | 🇮🇹 [Italiano](./docs/README.it.md) | 🇨🇳 [中文](./docs/README.zh.md) | 🇧🇷 [Português](./docs/README.pt.md)

# @techmefr/clipboard-define

A typed clipboard composable for Vue 3 and Nuxt applications. Copy text, open tel: links and mailto: links with reactive feedback state.

State-only: you control the UI (v-btn, v-icon, custom components). The engine manages the clipboard operations.

## Installation

```bash
pnpm add @techmefr/clipboard-define
```

## Quick Start

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
        {{ clipboard.isCopied.value ? 'Copied!' : 'Copy' }}
    </v-btn>
</template>
```

## API

### `copy(text)`

Copy text to clipboard. Returns `true` on success, `false` on failure.

```typescript
await clipboard.copy('Hello world')
clipboard.lastType.value // 'text'
```

### `tel(number)`

Copy the number to clipboard and open the tel: link.

```typescript
await clipboard.tel('+33 6 12 34 56 78')
clipboard.lastType.value // 'tel'
```

### `mail(email)`

Copy the email to clipboard and open the mailto: link.

```typescript
await clipboard.mail('contact@example.com')
clipboard.lastType.value // 'mail'
```

### `reset()`

Reset all state to initial values.

```typescript
clipboard.reset()
```

### Reactive Properties

| Property | Type | Description |
|----------|------|-------------|
| `isCopied` | `Ref<boolean>` | Whether a copy was recently successful (auto-resets after `resetDelay`) |
| `lastValue` | `Ref<string \| null>` | Last copied value |
| `lastType` | `Ref<ClipboardType \| null>` | Type of last copy: `'text'`, `'tel'` or `'mail'` |

## Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `resetDelay` | `number` | `2000` | Delay in ms before `isCopied` resets to `false` |

## Testing

All modules follow testability best practices. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic cleanup of data-* attributes in production
- Testing helpers for unit, integration and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

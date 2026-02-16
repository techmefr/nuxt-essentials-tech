[🇬🇧 English](./README.md) | [🇫🇷 Français](./docs/README.fr.md) | [🇪🇸 Español](./docs/README.es.md) | [🇩🇪 Deutsch](./docs/README.de.md) | [🇮🇹 Italiano](./docs/README.it.md) | [🇨🇳 中文](./docs/README.zh.md) | [🇧🇷 Português](./docs/README.pt.md)

# @techmefr/before-unload

Composable for handling beforeunload and navigation guards in Vue applications.

## Installation

```bash
pnpm add @techmefr/before-unload
```

## Usage

### Basic usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useBeforeUnload } from '@techmefr/before-unload'

const form = ref({ name: '', email: '' })
const isDirty = ref(false)

const { enable, disable, isActive } = useBeforeUnload({
    watch: () => isDirty.value,
})

const handleSubmit = async () => {
    await api.submit(form.value)
    disable()
}
</script>
```

### With custom message

```typescript
const { enable, disable } = useBeforeUnload({
    watch: () => form.isDirty,
    message: 'Custom warning message',
})
```

### With route change guard

```typescript
const { enable, disable } = useBeforeUnload({
    watch: () => form.isDirty,
    onRouteChange: true,
})
```

## API

### Config

```typescript
interface IBeforeUnloadConfig {
    watch: () => boolean | Ref<boolean>
    message?: string
    onRouteChange?: boolean
    onModalClose?: boolean
    autoDisableOnSubmit?: boolean
}
```

### Return

```typescript
interface IBeforeUnloadReturn {
    enable: () => void
    disable: () => void
    isActive: Ref<boolean>
}
```

## Testing

All modules follow best practices for testability. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic data-* attributes cleanup in production
- Testing helpers for unit, integration, and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

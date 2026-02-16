[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/before-unload

Composable für die Handhabung von beforeunload und Navigationsguards in Vue-Anwendungen.

## Installation

```bash
pnpm add @techmefr/before-unload
```

## Verwendung

### Grundlegende Verwendung

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

### Mit benutzerdefinierter Nachricht

```typescript
const { enable, disable } = useBeforeUnload({
    watch: () => form.isDirty,
    message: 'Custom warning message',
})
```

### Mit Route-Guard

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

Alle Module folgen Best Practices für Testbarkeit. Verwende [@techmefr/Datapower](https://github.com/techmefr/Datapower) für:
- Automatische Bereinigung von data-* Attributen in Produktion
- Test-Helpers für Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

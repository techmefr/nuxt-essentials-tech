[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/before-unload

Composable pour gérer beforeunload et les gardes de navigation dans les applications Vue.

## Installation

```bash
pnpm add @techmefr/before-unload
```

## Utilisation

### Utilisation de base

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

### Avec message personnalisé

```typescript
const { enable, disable } = useBeforeUnload({
    watch: () => form.isDirty,
    message: 'Custom warning message',
})
```

### Avec garde de route

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

## Tests

Tous les modules suivent les bonnes pratiques de testabilité. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'intégration et E2E
- Approche standardisée avec data-test-id, data-test-class, data-state

## Licence

MIT

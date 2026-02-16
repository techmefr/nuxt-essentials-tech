[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/before-unload

Composable para lidar com beforeunload e guardas de navegação em aplicações Vue.

## Instalação

```bash
pnpm add @techmefr/before-unload
```

## Uso

### Uso básico

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

### Com mensagem personalizada

```typescript
const { enable, disable } = useBeforeUnload({
    watch: () => form.isDirty,
    message: 'Custom warning message',
})
```

### Com guarda de rota

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

Todos os módulos seguem as melhores práticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automática de atributos data-* em produção
- Helpers de teste para testes unitários, de integração e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licença

MIT

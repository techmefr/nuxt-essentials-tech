[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/before-unload

Composable para manejar beforeunload y guardias de navegación en aplicaciones Vue.

## Instalación

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

### Con mensaje personalizado

```typescript
const { enable, disable } = useBeforeUnload({
    watch: () => form.isDirty,
    message: 'Custom warning message',
})
```

### Con guarda de ruta

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

Todos los módulos siguen las mejores prácticas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automática de atributos data-* en producción
- Helpers de testing para pruebas unitarias, de integración y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

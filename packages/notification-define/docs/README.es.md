[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/notification-define

Un motor de notificaciones tipado, basado en slugs, para aplicaciones Vue 3 y Nuxt. Define presets por tipo de notificación, apila o reemplaza, auto-descarta, deduplica y gestiona el ciclo de vida completo, incluyendo notificaciones basadas en promesas.

State-only: tú controlas la interfaz (v-snackbar, v-alert, componentes personalizados). El motor gestiona la cola.

## Instalación

```bash
pnpm add @techmefr/notification-define
```

## Inicio rápido

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

## Presets por slug

Cada clave en `presets` se convierte en un tipo de notificación con su propio estilo y comportamiento.

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `color` | `string` | Color de fondo |
| `textColor` | `string` | Color del texto |
| `linkColor` | `string` | Color de enlaces |
| `icon` | `string` | Nombre del icono (ej. `mdi-check-circle`) |
| `elevation` | `number` | Elevación Vuetify |
| `variant` | `string` | Variante Vuetify |
| `timeout` | `number` | Retraso de auto-descarte en ms (`0` = persistente) |
| `position` | `SnackPosition` | Posición en pantalla |
| `stacking` | `boolean` | `true` = apilar, `false` = reemplazar mismo slug |
| `closable` | `boolean` | Mostrar botón de cierre |
| `priority` | `number` | Orden de visualización (mayor = primero) |

## API

### `show(slug, content, overrides?)`

Método raíz. Devuelve el identificador de la notificación.

```typescript
const id = snack.show('error', 'Something went wrong', {
    actions: [{ label: 'Retry', handler: retryFn, color: 'white' }],
    isPersistent: true,
})
```

### Atajos dinámicos

Los métodos de atajo se generan a partir de las claves de presets:

```typescript
snack.success('Saved')
snack.error('Failed')
snack.warning('Check your input')
snack.info('New version available')
```

### `promise(promise, handlers)`

Gestiona el ciclo de vida de una promesa a través de una sola notificación.

```typescript
snack.promise(fetchUser(id), {
    pending: { slug: 'info', content: 'Loading user...' },
    success: { content: result => `Welcome ${result.name}` },
    error: { content: err => `Failed: ${err.message}` },
})
```

### `dismiss(id)`

Elimina una notificación específica por su identificador.

### `closeAll()`

Marca todas las notificaciones como cerrándose (`isClosing: true`). La capa de UI gestiona la animación de salida y luego llama a `dismiss(id)`.

### `dismissAll()`

Elimina todas las notificaciones instantáneamente.

### `clearZone(slug)`

Elimina todas las notificaciones de un slug dado.

### `update(id, options)`

Actualiza una notificación existente sin recrearla.

```typescript
snack.update(id, { content: 'Updated message', slug: 'success' })
```

## Contenido por componente

Pasa componentes Vue en lugar de cadenas de texto:

```typescript
import MyErrorCard from './MyErrorCard.vue'

snack.show('error', MyErrorCard, {
    contentProps: { message: 'Disk full', link: '/settings' },
})
```

## Configuración

| Propiedad | Tipo | Defecto | Descripción |
|----------|------|---------|-------------|
| `presets` | `Record<string, ISnackPreset>` | required | Definiciones de slugs |
| `maxStack` | `number` | `10` | Máximo de notificaciones visibles |
| `defaultTimeout` | `number` | `5000` | Tiempo de espera por defecto en ms |
| `deduplicate` | `boolean` | `false` | Prevenir mensajes duplicados |
| `deduplicateInterval` | `number` | `1000` | Ventana de deduplicación en ms |

## Instancias múltiples

Cada llamada a `defineSnackConfig` crea un composable totalmente aislado con su propia cola, timers, presets y atajos. Esto permite separar los usos: toasts para feedback del usuario, banners para alertas del sistema, etc.

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

toast.success('Archivo guardado')
alert.announcement('Mantenimiento programado a las 22h')
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
            <v-btn @click="alert.dismiss(item.id)">Cerrar</v-btn>
        </template>
    </v-banner>
</template>
```

Cada instancia es totalmente independiente:

| | `useToast()` | `useAlert()` |
|---|---|---|
| `items` | su propia lista | su propia lista |
| timers | sus propios timers | sus propios timers |
| presets | `success`, `error` | `announcement`, `maintenance` |
| atajos | `toast.success()`, `toast.error()` | `alert.announcement()`, `alert.maintenance()` |
| `dismissAll()` | limpia solo toasts | limpia solo alertas |
| config | su propio maxStack, dedup | su propio maxStack, dedup |

## Testing

Todos los módulos siguen las mejores prácticas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automática de atributos data-* en producción
- Helpers de testing para pruebas unitarias, de integración y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

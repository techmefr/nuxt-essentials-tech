🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/clipboard-define

Un composable de portapapeles tipado para aplicaciones Vue 3 y Nuxt. Copia de texto, apertura de enlaces tel: y mailto: con estado reactivo.

State-only: tu controlas la interfaz (v-btn, v-icon, componentes personalizados). El motor gestiona las operaciones del portapapeles.

## Instalacion

```bash
pnpm add @techmefr/clipboard-define
```

## Inicio rapido

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
        {{ clipboard.isCopied.value ? 'Copiado!' : 'Copiar' }}
    </v-btn>
</template>
```

## API

### `copy(text)`

Copia el texto al portapapeles. Devuelve `true` en caso de exito, `false` en caso de error.

```typescript
await clipboard.copy('Hello world')
clipboard.lastType.value // 'text'
```

### `tel(number)`

Copia el numero al portapapeles y abre el enlace tel:.

```typescript
await clipboard.tel('+33 6 12 34 56 78')
clipboard.lastType.value // 'tel'
```

### `mail(email)`

Copia el email al portapapeles y abre el enlace mailto:.

```typescript
await clipboard.mail('contact@example.com')
clipboard.lastType.value // 'mail'
```

### `reset()`

Reinicia todo el estado a los valores iniciales.

```typescript
clipboard.reset()
```

### Propiedades reactivas

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| `isCopied` | `Ref<boolean>` | Si una copia fue reciente exitosa (reset auto despues de `resetDelay`) |
| `lastValue` | `Ref<string \| null>` | Ultimo valor copiado |
| `lastType` | `Ref<ClipboardType \| null>` | Tipo de la ultima copia: `'text'`, `'tel'` o `'mail'` |

## Configuracion

| Propiedad | Tipo | Defecto | Descripcion |
|-----------|------|---------|-------------|
| `resetDelay` | `number` | `2000` | Retardo en ms antes de que `isCopied` vuelva a `false` |

## Tests

Todos los modulos siguen las buenas practicas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automatica de atributos data-* en produccion
- Helpers de test para tests unitarios, de integracion y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

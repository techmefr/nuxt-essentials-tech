🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/clipboard-define

Un composable per appunti tipizzato per applicazioni Vue 3 e Nuxt. Copia di testo, apertura di link tel: e mailto: con stato reattivo.

State-only: tu controlli l'interfaccia (v-btn, v-icon, componenti personalizzati). Il motore gestisce le operazioni degli appunti.

## Installazione

```bash
pnpm add @techmefr/clipboard-define
```

## Avvio rapido

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
        {{ clipboard.isCopied.value ? 'Copiato!' : 'Copia' }}
    </v-btn>
</template>
```

## API

### `copy(text)`

Copia il testo negli appunti. Restituisce `true` in caso di successo, `false` in caso di errore.

```typescript
await clipboard.copy('Hello world')
clipboard.lastType.value // 'text'
```

### `tel(number)`

Copia il numero negli appunti e apre il link tel:.

```typescript
await clipboard.tel('+33 6 12 34 56 78')
clipboard.lastType.value // 'tel'
```

### `mail(email)`

Copia l'email negli appunti e apre il link mailto:.

```typescript
await clipboard.mail('contact@example.com')
clipboard.lastType.value // 'mail'
```

### `reset()`

Ripristina tutto lo stato ai valori iniziali.

```typescript
clipboard.reset()
```

### Proprieta reattive

| Proprieta | Tipo | Descrizione |
|-----------|------|-------------|
| `isCopied` | `Ref<boolean>` | Se una copia e stata recentemente riuscita (reset auto dopo `resetDelay`) |
| `lastValue` | `Ref<string \| null>` | Ultimo valore copiato |
| `lastType` | `Ref<ClipboardType \| null>` | Tipo dell'ultima copia: `'text'`, `'tel'` o `'mail'` |

## Configurazione

| Proprieta | Tipo | Default | Descrizione |
|-----------|------|---------|-------------|
| `resetDelay` | `number` | `2000` | Ritardo in ms prima che `isCopied` torni a `false` |

## Test

Tutti i moduli seguono le best practice di testabilita. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) per:
- Pulizia automatica degli attributi data-* in produzione
- Helper di test per test unitari, di integrazione e E2E
- Approccio standardizzato con data-test-id, data-test-class, data-state

## Licenza

MIT

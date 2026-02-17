[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/notification-define

Un motore di notifiche tipizzato, basato su slug, per applicazioni Vue 3 e Nuxt. Definisci preset per tipo di notifica, impila o sostituisci, auto-elimina, deduplica e gestisci l'intero ciclo di vita, comprese le notifiche basate su promise.

State-only: tu controlli l'interfaccia (v-snackbar, v-alert, componenti personalizzati). Il motore gestisce la coda.

## Installazione

```bash
pnpm add @techmefr/notification-define
```

## Avvio rapido

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

## Preset per slug

Ogni chiave in `presets` diventa un tipo di notifica con il proprio stile e comportamento.

| Proprietà | Tipo | Descrizione |
|----------|------|-------------|
| `color` | `string` | Colore di sfondo |
| `textColor` | `string` | Colore del testo |
| `linkColor` | `string` | Colore dei link |
| `icon` | `string` | Nome dell'icona (es. `mdi-check-circle`) |
| `elevation` | `number` | Elevazione Vuetify |
| `variant` | `string` | Variante Vuetify |
| `timeout` | `number` | Ritardo di auto-eliminazione in ms (`0` = persistente) |
| `position` | `SnackPosition` | Posizione sullo schermo |
| `stacking` | `boolean` | `true` = impila, `false` = sostituisci stesso slug |
| `closable` | `boolean` | Mostra pulsante di chiusura |
| `priority` | `number` | Ordine di visualizzazione (più alto = primo) |

## API

### `show(slug, content, overrides?)`

Metodo radice. Restituisce l'identificatore della notifica.

```typescript
const id = snack.show('error', 'Something went wrong', {
    actions: [{ label: 'Retry', handler: retryFn, color: 'white' }],
    isPersistent: true,
})
```

### Scorciatoie dinamiche

I metodi scorciatoia vengono generati dalle chiavi dei preset:

```typescript
snack.success('Saved')
snack.error('Failed')
snack.warning('Check your input')
snack.info('New version available')
```

### `promise(promise, handlers)`

Gestisce il ciclo di vita di una promise attraverso una singola notifica.

```typescript
snack.promise(fetchUser(id), {
    pending: { slug: 'info', content: 'Loading user...' },
    success: { content: result => `Welcome ${result.name}` },
    error: { content: err => `Failed: ${err.message}` },
})
```

### `dismiss(id)`

Rimuove una notifica specifica tramite il suo identificatore.

### `closeAll()`

Contrassegna tutte le notifiche come in chiusura (`isClosing: true`). Il livello UI gestisce l'animazione di uscita, poi chiama `dismiss(id)`.

### `dismissAll()`

Rimuove tutte le notifiche istantaneamente.

### `clearZone(slug)`

Rimuove tutte le notifiche di un dato slug.

### `update(id, options)`

Aggiorna una notifica esistente senza ricrearla.

```typescript
snack.update(id, { content: 'Updated message', slug: 'success' })
```

## Contenuto per componente

Passa componenti Vue al posto di stringhe:

```typescript
import MyErrorCard from './MyErrorCard.vue'

snack.show('error', MyErrorCard, {
    contentProps: { message: 'Disk full', link: '/settings' },
})
```

## Configurazione

| Proprietà | Tipo | Predefinito | Descrizione |
|----------|------|---------|-------------|
| `presets` | `Record<string, ISnackPreset>` | required | Definizioni degli slug |
| `maxStack` | `number` | `10` | Numero massimo di notifiche visibili |
| `defaultTimeout` | `number` | `5000` | Timeout predefinito in ms |
| `deduplicate` | `boolean` | `false` | Previeni messaggi duplicati |
| `deduplicateInterval` | `number` | `1000` | Finestra di deduplicazione in ms |

## Istanze multiple

```typescript
const useToasts = defineSnackConfig<[]>(() => ({ presets: { success: {...}, error: {...} } }))
const useBanners = defineSnackConfig<[]>(() => ({ presets: { announcement: { timeout: 0, position: 'top-center' } } }))
```

## Testing

Tutti i moduli seguono le best practice di testabilità. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) per:
- Pulizia automatica degli attributi data-* in produzione
- Helper di test per test unitari, di integrazione e E2E
- Approccio standardizzato con data-test-id, data-test-class, data-state

## Licenza

MIT

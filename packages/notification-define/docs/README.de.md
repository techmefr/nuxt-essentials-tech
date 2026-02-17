[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/notification-define

Eine typisierte, slug-basierte Benachrichtigungs-Engine für Vue 3 und Nuxt Anwendungen. Definieren Sie Presets pro Benachrichtigungstyp, stapeln oder ersetzen, automatisch verwerfen, deduplizieren und den gesamten Lebenszyklus verwalten, einschließlich Promise-basierter Benachrichtigungen.

State-only: Sie kontrollieren die Oberfläche (v-snackbar, v-alert, benutzerdefinierte Komponenten). Die Engine verwaltet die Warteschlange.

## Installation

```bash
pnpm add @techmefr/notification-define
```

## Schnellstart

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

## Slug-Presets

Jeder Schlüssel in `presets` wird zu einem Benachrichtigungstyp mit eigenem Stil und Verhalten.

| Eigenschaft | Typ | Beschreibung |
|----------|------|-------------|
| `color` | `string` | Hintergrundfarbe |
| `textColor` | `string` | Textfarbe |
| `linkColor` | `string` | Linkfarbe |
| `icon` | `string` | Icon-Name (z.B. `mdi-check-circle`) |
| `elevation` | `number` | Vuetify-Elevation |
| `variant` | `string` | Vuetify-Variante |
| `timeout` | `number` | Automatische Verwerfungsverzögerung in ms (`0` = persistent) |
| `position` | `SnackPosition` | Bildschirmposition |
| `stacking` | `boolean` | `true` = stapeln, `false` = gleichen Slug ersetzen |
| `closable` | `boolean` | Schließen-Button anzeigen |
| `priority` | `number` | Anzeigereihenfolge (höher = zuerst) |

## API

### `show(slug, content, overrides?)`

Wurzelmethode. Gibt die Benachrichtigungs-ID zurück.

```typescript
const id = snack.show('error', 'Something went wrong', {
    actions: [{ label: 'Retry', handler: retryFn, color: 'white' }],
    isPersistent: true,
})
```

### Dynamische Abkürzungen

Abkürzungsmethoden werden aus den Preset-Schlüsseln generiert:

```typescript
snack.success('Saved')
snack.error('Failed')
snack.warning('Check your input')
snack.info('New version available')
```

### `promise(promise, handlers)`

Verwaltet den Lebenszyklus eines Promises über eine einzelne Benachrichtigung.

```typescript
snack.promise(fetchUser(id), {
    pending: { slug: 'info', content: 'Loading user...' },
    success: { content: result => `Welcome ${result.name}` },
    error: { content: err => `Failed: ${err.message}` },
})
```

### `dismiss(id)`

Entfernt eine bestimmte Benachrichtigung anhand ihrer ID.

### `closeAll()`

Markiert alle Benachrichtigungen als schließend (`isClosing: true`). Die UI-Schicht behandelt die Ausgangsanimation und ruft dann `dismiss(id)` auf.

### `dismissAll()`

Entfernt alle Benachrichtigungen sofort.

### `clearZone(slug)`

Entfernt alle Benachrichtigungen eines bestimmten Slugs.

### `update(id, options)`

Aktualisiert eine bestehende Benachrichtigung ohne sie neu zu erstellen.

```typescript
snack.update(id, { content: 'Updated message', slug: 'success' })
```

## Komponenten-Inhalt

Übergeben Sie Vue-Komponenten anstelle von Zeichenketten:

```typescript
import MyErrorCard from './MyErrorCard.vue'

snack.show('error', MyErrorCard, {
    contentProps: { message: 'Disk full', link: '/settings' },
})
```

## Konfiguration

| Eigenschaft | Typ | Standard | Beschreibung |
|----------|------|---------|-------------|
| `presets` | `Record<string, ISnackPreset>` | required | Slug-Definitionen |
| `maxStack` | `number` | `10` | Maximale sichtbare Benachrichtigungen |
| `defaultTimeout` | `number` | `5000` | Standard-Timeout in ms |
| `deduplicate` | `boolean` | `false` | Doppelte Nachrichten verhindern |
| `deduplicateInterval` | `number` | `1000` | Deduplizierungsfenster in ms |

## Mehrere Instanzen

Jeder Aufruf von `defineSnackConfig` erstellt ein vollständig isoliertes Composable mit eigener Warteschlange, eigenen Timern, Presets und Abkürzungen. So lassen sich Anwendungsfälle trennen: Toasts für Benutzer-Feedback, Banner für Systemwarnungen, usw.

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

toast.success('Datei gespeichert')
alert.announcement('Geplante Wartung um 22 Uhr')
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
            <v-btn @click="alert.dismiss(item.id)">Schließen</v-btn>
        </template>
    </v-banner>
</template>
```

Jede Instanz ist vollständig unabhängig:

| | `useToast()` | `useAlert()` |
|---|---|---|
| `items` | eigene Liste | eigene Liste |
| timers | eigene Timer | eigene Timer |
| presets | `success`, `error` | `announcement`, `maintenance` |
| Abkürzungen | `toast.success()`, `toast.error()` | `alert.announcement()`, `alert.maintenance()` |
| `dismissAll()` | leert nur Toasts | leert nur Alerts |
| config | eigenes maxStack, dedup | eigenes maxStack, dedup |

## Testing

Alle Module folgen den Best Practices für Testbarkeit. Verwenden Sie [@techmefr/Datapower](https://github.com/techmefr/Datapower) für:
- Automatische Bereinigung von data-*-Attributen in der Produktion
- Test-Helpers für Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

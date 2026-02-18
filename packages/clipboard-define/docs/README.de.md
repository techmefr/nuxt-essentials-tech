🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/clipboard-define

Ein typisiertes Zwischenablage-Composable fur Vue 3 und Nuxt Anwendungen. Textkopie, Offnen von tel: und mailto: Links mit reaktivem Status.

State-only: Sie steuern die Oberflache (v-btn, v-icon, benutzerdefinierte Komponenten). Die Engine verwaltet die Zwischenablage-Operationen.

## Installation

```bash
pnpm add @techmefr/clipboard-define
```

## Schnellstart

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
        {{ clipboard.isCopied.value ? 'Kopiert!' : 'Kopieren' }}
    </v-btn>
</template>
```

## API

### `copy(text)`

Kopiert Text in die Zwischenablage. Gibt `true` bei Erfolg zuruck, `false` bei Fehler.

```typescript
await clipboard.copy('Hello world')
clipboard.lastType.value // 'text'
```

### `tel(number)`

Kopiert die Nummer in die Zwischenablage und offnet den tel: Link.

```typescript
await clipboard.tel('+33 6 12 34 56 78')
clipboard.lastType.value // 'tel'
```

### `mail(email)`

Kopiert die E-Mail in die Zwischenablage und offnet den mailto: Link.

```typescript
await clipboard.mail('contact@example.com')
clipboard.lastType.value // 'mail'
```

### `reset()`

Setzt den gesamten Status auf die Anfangswerte zuruck.

```typescript
clipboard.reset()
```

### Reaktive Eigenschaften

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|--------------|
| `isCopied` | `Ref<boolean>` | Ob eine Kopie kurzlich erfolgreich war (Auto-Reset nach `resetDelay`) |
| `lastValue` | `Ref<string \| null>` | Letzter kopierter Wert |
| `lastType` | `Ref<ClipboardType \| null>` | Typ der letzten Kopie: `'text'`, `'tel'` oder `'mail'` |

## Konfiguration

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `resetDelay` | `number` | `2000` | Verzogerung in ms bevor `isCopied` auf `false` zuruckgesetzt wird |

## Tests

Alle Module folgen Best Practices fur Testbarkeit. Verwenden Sie [@techmefr/Datapower](https://github.com/techmefr/Datapower) fur:
- Automatische Bereinigung von data-* Attributen in der Produktion
- Test-Helpers fur Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

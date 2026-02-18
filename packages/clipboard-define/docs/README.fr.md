🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/clipboard-define

Un composable de presse-papier type pour les applications Vue 3 et Nuxt. Copie de texte, ouverture de liens tel: et mailto: avec etat reactif.

State-only : vous controlez l'interface (v-btn, v-icon, composants personnalises). Le moteur gere les operations de presse-papier.

## Installation

```bash
pnpm add @techmefr/clipboard-define
```

## Demarrage rapide

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
        {{ clipboard.isCopied.value ? 'Copie !' : 'Copier' }}
    </v-btn>
</template>
```

## API

### `copy(text)`

Copie le texte dans le presse-papier. Retourne `true` en cas de succes, `false` en cas d'echec.

```typescript
await clipboard.copy('Hello world')
clipboard.lastType.value // 'text'
```

### `tel(number)`

Copie le numero dans le presse-papier et ouvre le lien tel:.

```typescript
await clipboard.tel('+33 6 12 34 56 78')
clipboard.lastType.value // 'tel'
```

### `mail(email)`

Copie l'email dans le presse-papier et ouvre le lien mailto:.

```typescript
await clipboard.mail('contact@example.com')
clipboard.lastType.value // 'mail'
```

### `reset()`

Reinitialise tout l'etat aux valeurs initiales.

```typescript
clipboard.reset()
```

### Proprietes reactives

| Propriete | Type | Description |
|-----------|------|-------------|
| `isCopied` | `Ref<boolean>` | Si une copie a recemment reussi (reset auto apres `resetDelay`) |
| `lastValue` | `Ref<string \| null>` | Derniere valeur copiee |
| `lastType` | `Ref<ClipboardType \| null>` | Type de la derniere copie : `'text'`, `'tel'` ou `'mail'` |

## Configuration

| Propriete | Type | Defaut | Description |
|-----------|------|--------|-------------|
| `resetDelay` | `number` | `2000` | Delai en ms avant que `isCopied` repasse a `false` |

## Tests

Tous les modules suivent les bonnes pratiques de testabilite. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'integration et E2E
- Approche standardisee avec data-test-id, data-test-class, data-state

## Licence

MIT

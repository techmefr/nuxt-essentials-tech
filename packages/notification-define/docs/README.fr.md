[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/notification-define

Un moteur de notifications typé, basé sur des slugs, pour les applications Vue 3 et Nuxt. Définissez des presets par type de notification, empilez ou remplacez, auto-supprimez, dédupliquez et gérez le cycle de vie complet, y compris les notifications basées sur des promesses.

State-only : vous contrôlez l'interface (v-snackbar, v-alert, composants personnalisés). Le moteur gère la file d'attente.

## Installation

```bash
pnpm add @techmefr/notification-define
```

## Démarrage rapide

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

## Presets par slug

Chaque clé dans `presets` devient un type de notification avec son propre style et comportement.

| Propriété | Type | Description |
|----------|------|-------------|
| `color` | `string` | Couleur de fond |
| `textColor` | `string` | Couleur du texte |
| `linkColor` | `string` | Couleur des liens |
| `icon` | `string` | Nom de l'icône (ex. `mdi-check-circle`) |
| `elevation` | `number` | Élévation Vuetify |
| `variant` | `string` | Variante Vuetify |
| `timeout` | `number` | Délai de suppression automatique en ms (`0` = persistant) |
| `position` | `SnackPosition` | Position à l'écran |
| `stacking` | `boolean` | `true` = empiler, `false` = remplacer le même slug |
| `closable` | `boolean` | Afficher le bouton de fermeture |
| `priority` | `number` | Ordre d'affichage (plus élevé = premier) |

## API

### `show(slug, content, overrides?)`

Méthode racine. Retourne l'identifiant de la notification.

```typescript
const id = snack.show('error', 'Something went wrong', {
    actions: [{ label: 'Retry', handler: retryFn, color: 'white' }],
    isPersistent: true,
})
```

### Raccourcis dynamiques

Les méthodes de raccourci sont générées à partir des clés de presets :

```typescript
snack.success('Saved')
snack.error('Failed')
snack.warning('Check your input')
snack.info('New version available')
```

### `promise(promise, handlers)`

Gère le cycle de vie d'une promesse à travers une seule notification.

```typescript
snack.promise(fetchUser(id), {
    pending: { slug: 'info', content: 'Loading user...' },
    success: { content: result => `Welcome ${result.name}` },
    error: { content: err => `Failed: ${err.message}` },
})
```

### `dismiss(id)`

Supprime une notification spécifique par son identifiant.

### `closeAll()`

Marque toutes les notifications comme en fermeture (`isClosing: true`). La couche UI gère l'animation de sortie, puis appelle `dismiss(id)`.

### `dismissAll()`

Supprime toutes les notifications instantanément.

### `clearZone(slug)`

Supprime toutes les notifications d'un slug donné.

### `update(id, options)`

Met à jour une notification existante sans la recréer.

```typescript
snack.update(id, { content: 'Updated message', slug: 'success' })
```

## Contenu par composant

Passez des composants Vue au lieu de chaînes de caractères :

```typescript
import MyErrorCard from './MyErrorCard.vue'

snack.show('error', MyErrorCard, {
    contentProps: { message: 'Disk full', link: '/settings' },
})
```

## Configuration

| Propriété | Type | Défaut | Description |
|----------|------|---------|-------------|
| `presets` | `Record<string, ISnackPreset>` | required | Définitions des slugs |
| `maxStack` | `number` | `10` | Nombre maximum de notifications visibles |
| `defaultTimeout` | `number` | `5000` | Délai par défaut en ms |
| `deduplicate` | `boolean` | `false` | Empêcher les messages en double |
| `deduplicateInterval` | `number` | `1000` | Fenêtre de déduplication en ms |

## Instances multiples

Chaque appel à `defineSnackConfig` crée un composable totalement isolé avec sa propre file, ses propres timers, presets et raccourcis. Cela permet de séparer les usages : toasts pour le feedback utilisateur, bannières pour les alertes système, etc.

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

toast.success('Fichier sauvegardé')
alert.announcement('Maintenance prévue à 22h')
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
            <v-btn @click="alert.dismiss(item.id)">Fermer</v-btn>
        </template>
    </v-banner>
</template>
```

Chaque instance est totalement indépendante :

| | `useToast()` | `useAlert()` |
|---|---|---|
| `items` | sa propre liste | sa propre liste |
| timers | ses propres timers | ses propres timers |
| presets | `success`, `error` | `announcement`, `maintenance` |
| raccourcis | `toast.success()`, `toast.error()` | `alert.announcement()`, `alert.maintenance()` |
| `dismissAll()` | vide les toasts uniquement | vide les alertes uniquement |
| config | son propre maxStack, dedup | son propre maxStack, dedup |

## Tests

Tous les modules suivent les bonnes pratiques de testabilité. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'intégration et E2E
- Approche standardisée avec data-test-id, data-test-class, data-state

## Licence

MIT

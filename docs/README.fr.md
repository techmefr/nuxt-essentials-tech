[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

Une collection de modules typ\u00e9s et pr\u00eats pour la production, destin\u00e9s aux applications Vue 3 et Nuxt. Chaque package r\u00e9sout un probl\u00e8me r\u00e9current avec une API composable propre, construite sur Vuetify.

Con\u00e7u pour standardiser les patterns courants entre projets : tables de donn\u00e9es, formulaires, filtres, et plus encore.

## Packages

| Package | Description | Documentation |
|---------|-------------|---------------|
| `@techmefr/table-define` | Composable pour tables Vuetify c\u00f4t\u00e9 serveur avec \u00e9tat r\u00e9actif, auto-watch, debounce et gestion d'erreurs | [README](../packages/table-define/docs/README.fr.md) |
| `@techmefr/debounce` | Utilitaire debounce et composable pour applications Vue | [README](../packages/debounce/docs/README.fr.md) |
| `@techmefr/before-unload` | Composable pour beforeunload et gardes de navigation Vue | [README](../packages/before-unload/docs/README.fr.md) |
| `@techmefr/infinite-pagination` | Composable pour pagination infinie avec auto-append, état de chargement et gestion d'erreurs | [README](../packages/infinite-pagination/docs/README.fr.md) |
| `@techmefr/datetime-define` | defineDate, defineDateTime, defineDateRange — pickers typés avec support locale et fuseau horaire via date-fns | [README](../packages/datetime-define/docs/README.fr.md) |
| `@techmefr/notification-define` | Moteur de notifications par slug avec presets, empilement, priorité, déduplication et cycle de vie des promesses | [README](../packages/notification-define/docs/README.fr.md) |
| `@techmefr/progress-define` | Composable de suivi de progression typé avec pourcentage, ratio, restant et sortie formatée réactifs | [README](../packages/progress-define/docs/README.fr.md) |
| `@techmefr/threshold-define` | Composable de seuils typé avec couleur, label et style réactifs basés sur des plages de valeurs | [README](../packages/threshold-define/docs/README.fr.md) |

## D\u00e9veloppement

```bash
pnpm install
cd packages/<package-name>
pnpm test
pnpm build
```

## Tests

Tous les modules suivent les bonnes pratiques de testabilité. Utilisez [@techmefr/Datapower](https://github.com/techmefr/Datapower) pour :
- Nettoyage automatique des attributs data-* en production
- Helpers de test pour les tests unitaires, d'intégration et E2E
- Approche standardisée avec data-test-id, data-test-class, data-state

## Licence

MIT

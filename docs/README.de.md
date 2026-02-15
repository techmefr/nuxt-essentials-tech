[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

Eine Sammlung produktionsreifer, typisierter Module f\u00fcr Vue 3 und Nuxt Anwendungen. Jedes Paket l\u00f6st ein wiederkehrendes Problem mit einer sauberen, zusammensetzbaren API auf Basis von Vuetify.

Entwickelt, um g\u00e4ngige Muster projekt\u00fcbergreifend zu standardisieren: Datentabellen, Formulare, Filter und mehr.

## Pakete

| Paket | Beschreibung | Dokumentation |
|-------|-------------|---------------|
| `@techmefr/table-define` | Composable f\u00fcr serverseitige Vuetify-Tabellen mit reaktivem Zustand, Auto-Watch, Debounce und Fehlerbehandlung | [README](../packages/table-define/docs/README.de.md) |

## Entwicklung

```bash
pnpm install
cd packages/<package-name>
pnpm test
pnpm build
```

## Testing

Alle Module folgen Best Practices für Testbarkeit. Verwende [@techmefr/Datapower](https://github.com/techmefr/Datapower) für:
- Automatische Bereinigung von data-* Attributen in Produktion
- Test-Helpers für Unit-, Integrations- und E2E-Tests
- Standardisierter Ansatz mit data-test-id, data-test-class, data-state

## Lizenz

MIT

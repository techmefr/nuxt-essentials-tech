[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

Eine Sammlung produktionsreifer, typisierter Module f\u00fcr Vue 3 und Nuxt Anwendungen. Jedes Paket l\u00f6st ein wiederkehrendes Problem mit einer sauberen, zusammensetzbaren API auf Basis von Vuetify.

Entwickelt, um g\u00e4ngige Muster projekt\u00fcbergreifend zu standardisieren: Datentabellen, Formulare, Filter und mehr.

## Pakete

| Paket | Beschreibung | Dokumentation |
|-------|-------------|---------------|
| `@techmefr/table-define` | Composable f\u00fcr serverseitige Vuetify-Tabellen mit reaktivem Zustand, Auto-Watch, Debounce und Fehlerbehandlung | [README](../packages/table-define/docs/README.de.md) |
| `@techmefr/debounce` | Debounce-Utility und Composable für Vue-Anwendungen | [README](../packages/debounce/docs/README.de.md) |
| `@techmefr/before-unload` | Composable für beforeunload und Navigationsguards in Vue | [README](../packages/before-unload/docs/README.de.md) |
| `@techmefr/infinite-pagination` | Composable für unendliche Paginierung mit Auto-Append, Ladezustand und Fehlerbehandlung | [README](../packages/infinite-pagination/docs/README.de.md) |
| `@techmefr/datetime-define` | defineDate, defineDateTime, defineDateRange — typisierte Picker mit date-fns Locale- und Zeitzonen-Unterstützung | [README](../packages/datetime-define/docs/README.de.md) |
| `@techmefr/notification-define` | Slug-basierte Benachrichtigungs-Engine mit Presets, Stapelung, Priorität, Deduplizierung und Promise-Lebenszyklus | [README](../packages/notification-define/docs/README.de.md) |
| `@techmefr/progress-define` | Typisiertes Fortschritts-Composable mit reaktivem Prozentsatz, Verhältnis, Restwert und formatierter Ausgabe | [README](../packages/progress-define/docs/README.de.md) |
| `@techmefr/threshold-define` | Typisiertes Schwellenwert-Composable mit reaktiver Farbe, Label und Stil basierend auf Wertebereichen | [README](../packages/threshold-define/docs/README.de.md) |
| `@techmefr/clipboard-define` | Zwischenablage-Composable mit Kopieren, tel: und mailto: Unterstützung und reaktivem Feedback-Status | [README](../packages/clipboard-define/docs/README.de.md) |

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

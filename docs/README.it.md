[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

Una collezione di moduli tipizzati e pronti per la produzione, progettati per applicazioni Vue 3 e Nuxt. Ogni pacchetto risolve un problema ricorrente con un'API composable pulita, costruita su Vuetify.

Progettato per standardizzare i pattern comuni tra i progetti: tabelle dati, form, filtri e altro.

## Pacchetti

| Pacchetto | Descrizione | Documentazione |
|-----------|-------------|----------------|
| `@techmefr/table-define` | Composable per tabelle Vuetify lato server con stato reattivo, auto-watch, debounce e gestione errori | [README](../packages/table-define/docs/README.it.md) |

## Sviluppo

```bash
pnpm install
cd packages/<package-name>
pnpm test
pnpm build
```

## Testing

Tutti i moduli seguono le best practice per la testabilità. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) per:
- Pulizia automatica degli attributi data-* in produzione
- Helper di test per test unitari, di integrazione e E2E
- Approccio standardizzato con data-test-id, data-test-class, data-state

## Licenza

MIT

[🇬🇧 English](./README.md) | [🇫🇷 Français](./docs/README.fr.md) | [🇪🇸 Español](./docs/README.es.md) | [🇩🇪 Deutsch](./docs/README.de.md) | [🇮🇹 Italiano](./docs/README.it.md) | [🇨🇳 中文](./docs/README.zh.md) | [🇧🇷 Português](./docs/README.pt.md)

# @techmefr/vue-industrial

A collection of production-ready, typed modules for Vue 3 and Nuxt applications. Each package solves a specific recurring problem with a clean, composable API built on top of Vuetify.

Designed to standardize common patterns across projects: data tables, forms, filters, and more.

## Packages

| Package | Description | Documentation |
|---------|-------------|---------------|
| `@techmefr/table-define` | Composable for Vuetify server-side tables with reactive state, auto-watch, debounce and error handling | [README](./packages/table-define/README.md) |
| `@techmefr/debounce` | Debounce utility and composable for Vue applications | [README](./packages/debounce/README.md) |
| `@techmefr/before-unload` | Composable for beforeunload and navigation guards in Vue applications | [README](./packages/before-unload/README.md) |
| `@techmefr/infinite-pagination` | Composable for infinite pagination with auto-append, loading state and error handling | [README](./packages/infinite-pagination/README.md) |

## Development

```bash
pnpm install
cd packages/<package-name>
pnpm test
pnpm build
```

## Testing

All modules follow best practices for testability. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) for:
- Automatic data-* attributes cleanup in production
- Testing helpers for unit, integration, and E2E tests
- Standardized approach with data-test-id, data-test-class, data-state

## License

MIT

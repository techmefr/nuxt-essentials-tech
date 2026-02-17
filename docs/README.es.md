[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

Una colecci\u00f3n de m\u00f3dulos tipados y listos para producci\u00f3n, dise\u00f1ados para aplicaciones Vue 3 y Nuxt. Cada paquete resuelve un problema recurrente con una API composable limpia, construida sobre Vuetify.

Dise\u00f1ado para estandarizar patrones comunes entre proyectos: tablas de datos, formularios, filtros y m\u00e1s.

## Paquetes

| Paquete | Descripci\u00f3n | Documentaci\u00f3n |
|---------|-------------|---------------|
| `@techmefr/table-define` | Composable para tablas Vuetify del lado del servidor con estado reactivo, auto-watch, debounce y manejo de errores | [README](../packages/table-define/docs/README.es.md) |
| `@techmefr/debounce` | Utilidad debounce y composable para aplicaciones Vue | [README](../packages/debounce/docs/README.es.md) |
| `@techmefr/before-unload` | Composable para beforeunload y guardias de navegación Vue | [README](../packages/before-unload/docs/README.es.md) |
| `@techmefr/infinite-pagination` | Composable para paginación infinita con auto-append, estado de carga y manejo de errores | [README](../packages/infinite-pagination/docs/README.es.md) |
| `@techmefr/datetime-define` | defineDate, defineDateTime, defineDateRange — pickers tipados con soporte de locale y zona horaria via date-fns | [README](../packages/datetime-define/docs/README.es.md) |

## Desarrollo

```bash
pnpm install
cd packages/<package-name>
pnpm test
pnpm build
```

## Testing

Todos los módulos siguen las mejores prácticas de testabilidad. Usa [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpieza automática de atributos data-* en producción
- Helpers de testing para pruebas unitarias, de integración y E2E
- Enfoque estandarizado con data-test-id, data-test-class, data-state

## Licencia

MIT

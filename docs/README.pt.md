[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

Uma cole\u00e7\u00e3o de m\u00f3dulos tipados e prontos para produ\u00e7\u00e3o, projetados para aplica\u00e7\u00f5es Vue 3 e Nuxt. Cada pacote resolve um problema recorrente com uma API compos\u00e1vel limpa, constru\u00edda sobre o Vuetify.

Projetado para padronizar padr\u00f5es comuns entre projetos: tabelas de dados, formul\u00e1rios, filtros e mais.

## Pacotes

| Pacote | Descri\u00e7\u00e3o | Documenta\u00e7\u00e3o |
|--------|-----------|---------------|
| `@techmefr/table-define` | Composable para tabelas Vuetify do lado do servidor com estado reativo, auto-watch, debounce e tratamento de erros | [README](../packages/table-define/docs/README.pt.md) |

## Desenvolvimento

```bash
pnpm install
cd packages/<package-name>
pnpm test
pnpm build
```

## Testing

Todos os módulos seguem as melhores práticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automática de atributos data-* em produção
- Helpers de teste para testes unitários, de integração e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state


## Licen\u00e7a

MIT

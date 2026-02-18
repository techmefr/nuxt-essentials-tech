[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

Uma cole\u00e7\u00e3o de m\u00f3dulos tipados e prontos para produ\u00e7\u00e3o, projetados para aplica\u00e7\u00f5es Vue 3 e Nuxt. Cada pacote resolve um problema recorrente com uma API compos\u00e1vel limpa, constru\u00edda sobre o Vuetify.

Projetado para padronizar padr\u00f5es comuns entre projetos: tabelas de dados, formul\u00e1rios, filtros e mais.

## Pacotes

| Pacote | Descri\u00e7\u00e3o | Documenta\u00e7\u00e3o |
|--------|-----------|---------------|
| `@techmefr/table-define` | Composable para tabelas Vuetify do lado do servidor com estado reativo, auto-watch, debounce e tratamento de erros | [README](../packages/table-define/docs/README.pt.md) |
| `@techmefr/debounce` | Utilitário debounce e composable para aplicações Vue | [README](../packages/debounce/docs/README.pt.md) |
| `@techmefr/before-unload` | Composable para beforeunload e guardas de navegação Vue | [README](../packages/before-unload/docs/README.pt.md) |
| `@techmefr/infinite-pagination` | Composable para paginação infinita com auto-append, estado de carregamento e tratamento de erros | [README](../packages/infinite-pagination/docs/README.pt.md) |
| `@techmefr/datetime-define` | defineDate, defineDateTime, defineDateRange — pickers tipados com suporte a locale e fuso horário via date-fns | [README](../packages/datetime-define/docs/README.pt.md) |
| `@techmefr/notification-define` | Motor de notificações baseado em slug com presets, empilhamento, prioridade, deduplicação e ciclo de vida de promises | [README](../packages/notification-define/docs/README.pt.md) |
| `@techmefr/progress-define` | Composable tipado de acompanhamento de progresso com percentual, razão, restante e saída formatada reativos | [README](../packages/progress-define/docs/README.pt.md) |
| `@techmefr/threshold-define` | Composable tipado de limiares com cor, rótulo e estilo reativos baseados em faixas de valores | [README](../packages/threshold-define/docs/README.pt.md) |
| `@techmefr/clipboard-define` | Composable de area de transferencia com copia, tel: e mailto: e estado de feedback reativo | [README](../packages/clipboard-define/docs/README.pt.md) |

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

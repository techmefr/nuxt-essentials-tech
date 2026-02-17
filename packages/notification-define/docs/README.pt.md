[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/notification-define

Um motor de notificações tipado, baseado em slugs, para aplicações Vue 3 e Nuxt. Defina presets por tipo de notificação, empilhe ou substitua, auto-descarte, deduplique e gerencie o ciclo de vida completo, incluindo notificações baseadas em promises.

State-only: você controla a interface (v-snackbar, v-alert, componentes personalizados). O motor gerencia a fila.

## Instalação

```bash
pnpm add @techmefr/notification-define
```

## Início rápido

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

## Presets por slug

Cada chave em `presets` se torna um tipo de notificação com seu próprio estilo e comportamento.

| Propriedade | Tipo | Descrição |
|----------|------|-------------|
| `color` | `string` | Cor de fundo |
| `textColor` | `string` | Cor do texto |
| `linkColor` | `string` | Cor dos links |
| `icon` | `string` | Nome do ícone (ex. `mdi-check-circle`) |
| `elevation` | `number` | Elevação Vuetify |
| `variant` | `string` | Variante Vuetify |
| `timeout` | `number` | Atraso de auto-descarte em ms (`0` = persistente) |
| `position` | `SnackPosition` | Posição na tela |
| `stacking` | `boolean` | `true` = empilhar, `false` = substituir mesmo slug |
| `closable` | `boolean` | Mostrar botão de fechar |
| `priority` | `number` | Ordem de exibição (maior = primeiro) |

## API

### `show(slug, content, overrides?)`

Método raiz. Retorna o identificador da notificação.

```typescript
const id = snack.show('error', 'Something went wrong', {
    actions: [{ label: 'Retry', handler: retryFn, color: 'white' }],
    isPersistent: true,
})
```

### Atalhos dinâmicos

Os métodos de atalho são gerados a partir das chaves de presets:

```typescript
snack.success('Saved')
snack.error('Failed')
snack.warning('Check your input')
snack.info('New version available')
```

### `promise(promise, handlers)`

Gerencia o ciclo de vida de uma promise através de uma única notificação.

```typescript
snack.promise(fetchUser(id), {
    pending: { slug: 'info', content: 'Loading user...' },
    success: { content: result => `Welcome ${result.name}` },
    error: { content: err => `Failed: ${err.message}` },
})
```

### `dismiss(id)`

Remove uma notificação específica pelo seu identificador.

### `closeAll()`

Marca todas as notificações como fechando (`isClosing: true`). A camada de UI gerencia a animação de saída, depois chama `dismiss(id)`.

### `dismissAll()`

Remove todas as notificações instantaneamente.

### `clearZone(slug)`

Remove todas as notificações de um slug dado.

### `update(id, options)`

Atualiza uma notificação existente sem recriá-la.

```typescript
snack.update(id, { content: 'Updated message', slug: 'success' })
```

## Conteúdo por componente

Passe componentes Vue em vez de strings:

```typescript
import MyErrorCard from './MyErrorCard.vue'

snack.show('error', MyErrorCard, {
    contentProps: { message: 'Disk full', link: '/settings' },
})
```

## Configuração

| Propriedade | Tipo | Padrão | Descrição |
|----------|------|---------|-------------|
| `presets` | `Record<string, ISnackPreset>` | required | Definições dos slugs |
| `maxStack` | `number` | `10` | Máximo de notificações visíveis |
| `defaultTimeout` | `number` | `5000` | Timeout padrão em ms |
| `deduplicate` | `boolean` | `false` | Prevenir mensagens duplicadas |
| `deduplicateInterval` | `number` | `1000` | Janela de deduplicação em ms |

## Múltiplas instâncias

```typescript
const useToasts = defineSnackConfig<[]>(() => ({ presets: { success: {...}, error: {...} } }))
const useBanners = defineSnackConfig<[]>(() => ({ presets: { announcement: { timeout: 0, position: 'top-center' } } }))
```

## Testing

Todos os módulos seguem as melhores práticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automática de atributos data-* em produção
- Helpers de teste para testes unitários, de integração e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licença

MIT

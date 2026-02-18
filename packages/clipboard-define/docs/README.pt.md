🇬🇧 [English](../README.md) | 🇫🇷 [Français](./README.fr.md) | 🇪🇸 [Español](./README.es.md) | 🇩🇪 [Deutsch](./README.de.md) | 🇮🇹 [Italiano](./README.it.md) | 🇨🇳 [中文](./README.zh.md) | 🇧🇷 [Português](./README.pt.md)

# @techmefr/clipboard-define

Um composable de area de transferencia tipado para aplicacoes Vue 3 e Nuxt. Copia de texto, abertura de links tel: e mailto: com estado reativo.

State-only: voce controla a interface (v-btn, v-icon, componentes personalizados). O motor gerencia as operacoes da area de transferencia.

## Instalacao

```bash
pnpm add @techmefr/clipboard-define
```

## Inicio rapido

```typescript
import { defineClipboard } from '@techmefr/clipboard-define'

const useClipboard = defineClipboard<[]>(() => ({
    resetDelay: 2000,
}))
```

```vue
<script setup>
const clipboard = useClipboard()

async function handleCopy() {
    await clipboard.copy('Hello world')
}
</script>

<template>
    <v-btn @click="handleCopy">
        {{ clipboard.isCopied.value ? 'Copiado!' : 'Copiar' }}
    </v-btn>
</template>
```

## API

### `copy(text)`

Copia o texto para a area de transferencia. Retorna `true` em caso de sucesso, `false` em caso de erro.

```typescript
await clipboard.copy('Hello world')
clipboard.lastType.value // 'text'
```

### `tel(number)`

Copia o numero para a area de transferencia e abre o link tel:.

```typescript
await clipboard.tel('+33 6 12 34 56 78')
clipboard.lastType.value // 'tel'
```

### `mail(email)`

Copia o email para a area de transferencia e abre o link mailto:.

```typescript
await clipboard.mail('contact@example.com')
clipboard.lastType.value // 'mail'
```

### `reset()`

Reseta todo o estado para os valores iniciais.

```typescript
clipboard.reset()
```

### Propriedades reativas

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `isCopied` | `Ref<boolean>` | Se uma copia foi recentemente bem-sucedida (reset auto apos `resetDelay`) |
| `lastValue` | `Ref<string \| null>` | Ultimo valor copiado |
| `lastType` | `Ref<ClipboardType \| null>` | Tipo da ultima copia: `'text'`, `'tel'` ou `'mail'` |

## Configuracao

| Propriedade | Tipo | Padrao | Descricao |
|-------------|------|--------|-----------|
| `resetDelay` | `number` | `2000` | Atraso em ms antes de `isCopied` voltar a `false` |

## Testes

Todos os modulos seguem as boas praticas de testabilidade. Use [@techmefr/Datapower](https://github.com/techmefr/Datapower) para:
- Limpeza automatica de atributos data-* em producao
- Helpers de teste para testes unitarios, de integracao e E2E
- Abordagem padronizada com data-test-id, data-test-class, data-state

## Licenca

MIT

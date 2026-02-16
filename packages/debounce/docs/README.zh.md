[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/debounce

用于 Vue 应用的防抖工具和 Composable。

## 安装

```bash
pnpm add @techmefr/debounce
```

## 使用

### 简单防抖工具

```typescript
import { debounce } from '@techmefr/debounce'

const search = debounce((query: string) => {
    api.search(query)
}, 500)

search('test')
search.cancel()
```

### 带选项

```typescript
const save = debounce(
    (data: FormData) => api.save(data),
    { 
        delay: 300, 
        leading: true, 
        trailing: false 
    }
)
```

### Vue Composable

```typescript
import { useDebounce } from '@techmefr/debounce'

const { execute, cancel, isPending } = useDebounce(
    async (query: string) => {
        return await api.search(query)
    },
    { delay: 500 }
)

await execute('test')
cancel()
```

## API

### debounce

```typescript
function debounce<TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    delayOrOptions: number | IDebounceOptions
): IDebouncedFunction<TArgs>
```

### useDebounce

```typescript
function useDebounce<TArgs extends unknown[], TReturn>(
    fn: (...args: TArgs) => Promise<TReturn> | TReturn,
    options?: IDebounceOptions
): IUseDebounceReturn<TArgs, TReturn>
```

### Options

```typescript
interface IDebounceOptions {
    delay?: number
    leading?: boolean
    trailing?: boolean
}
```

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower) 实现：
- 生产环境自动清理 data-* 属性
- 单元测试、集成测试和 E2E 测试的测试工具
- 使用 data-test-id、data-test-class、data-state 的标准化方案

## 许可证

MIT

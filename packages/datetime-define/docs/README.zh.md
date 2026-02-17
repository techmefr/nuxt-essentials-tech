[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/datetime-define

一套面向 Vue 3 和 Nuxt 应用的强类型工厂 Composable，用于日期、日期时间和日期范围选择器。基于 date-fns 提供本地化格式和时区支持。

三个专注的函数，每个对应一个用例 — 与 `defineTable` 相同的模式。

## 安装

```bash
pnpm add @techmefr/datetime-define date-fns date-fns-tz
```

## defineDate

简单的日期选择器，包含验证和格式化。

```typescript
import { defineDate } from '@techmefr/datetime-define'
import { fr } from 'date-fns/locale'

const useBirthDate = defineDate<[]>(() => ({
    locale: fr,
    maxDate: new Date(),
}))
```

## defineDateTime

日期 + 时间选择器，包含组合计算属性和格式化。

```typescript
import { defineDateTime } from '@techmefr/datetime-define'

const useEventPicker = defineDateTime<[]>(() => ({
    minDate: new Date(),
}))
```

## defineDateRange

日期范围选择器，包含 start/end 和格式化范围。

```typescript
import { defineDateRange } from '@techmefr/datetime-define'

const useAvailability = defineDateRange<[]>(() => ({
    minDate: new Date(),
    separator: ' to ',
}))
```

## 本地化与时区

```typescript
import { fr, de } from 'date-fns/locale'

const useDatePicker = defineDate<[]>(() => ({
    locale: fr,
    timezone: 'Europe/Paris',
    format: 'PPP',
}))

const { formatted, setLocale } = useDatePicker()

setLocale(de)
```

`formatted` 计算属性会响应 locale 的变化。使用 `setLocale()` 动态切换语言。

## 动态参数

```typescript
const useEventPicker = defineDateTime<[Date]>(minDate => ({
    minDate,
}))

const picker = useEventPicker(new Date())
```

## 验证

`isValid` 自动检查：
- **defineDate**：日期非 null、有效的 Date 对象、在 min/max 范围内
- **defineDateTime**：combined 非 null、在 min/max 范围内
- **defineDateRange**：start 和 end 非 null、start <= end、在 min/max 范围内

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower) 实现：
- 生产环境自动清理 data-* 属性
- 单元测试、集成测试和 E2E 测试的测试工具
- 使用 data-test-id、data-test-class、data-state 的标准化方案

## 许可证

MIT

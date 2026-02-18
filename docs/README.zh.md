[🇬🇧 English](../README.md) | [🇫🇷 Français](./README.fr.md) | [🇪🇸 Español](./README.es.md) | [🇩🇪 Deutsch](./README.de.md) | [🇮🇹 Italiano](./README.it.md) | [🇨🇳 中文](./README.zh.md) | [🇧🇷 Português](./README.pt.md)

# @techmefr/vue-industrial

\u4E00\u5957\u9762\u5411 Vue 3 \u548C Nuxt \u5E94\u7528\u7684\u751F\u4EA7\u5C31\u7EEA\u3001\u5F3A\u7C7B\u578B\u6A21\u5757\u96C6\u5408\u3002\u6BCF\u4E2A\u5305\u90FD\u901A\u8FC7\u57FA\u4E8E Vuetify \u7684\u7B80\u6D01\u53EF\u7EC4\u5408 API \u89E3\u51B3\u4E00\u4E2A\u5E38\u89C1\u7684\u53CD\u590D\u51FA\u73B0\u7684\u95EE\u9898\u3002

\u65E8\u5728\u8DE8\u9879\u76EE\u6807\u51C6\u5316\u5E38\u89C1\u6A21\u5F0F\uFF1A\u6570\u636E\u8868\u683C\u3001\u8868\u5355\u3001\u7B5B\u9009\u7B49\u3002

## \u5305\u5217\u8868

| \u5305 | \u63CF\u8FF0 | \u6587\u6863 |
|---|------|------|
| `@techmefr/table-define` | \u7528\u4E8E Vuetify \u670D\u52A1\u7AEF\u8868\u683C\u7684 Composable\uFF0C\u652F\u6301\u54CD\u5E94\u5F0F\u72B6\u6001\u3001\u81EA\u52A8\u76D1\u542C\u3001\u9632\u6296\u548C\u9519\u8BEF\u5904\u7406 | [README](../packages/table-define/docs/README.zh.md) |
| `@techmefr/debounce` | 用于 Vue 应用的防抖工具和 Composable | [README](../packages/debounce/docs/README.zh.md) |
| `@techmefr/before-unload` | 用于 Vue 应用的 beforeunload 和导航守卫 Composable | [README](../packages/before-unload/docs/README.zh.md) |
| `@techmefr/infinite-pagination` | 用于 Vue 应用的无限分页 Composable，支持自动追加、加载状态和错误处理 | [README](../packages/infinite-pagination/docs/README.zh.md) |
| `@techmefr/datetime-define` | defineDate, defineDateTime, defineDateRange — 强类型选择器，支持 date-fns 本地化和时区 | [README](../packages/datetime-define/docs/README.zh.md) |
| `@techmefr/notification-define` | 基于 slug 的通知引擎，支持预设、堆叠、优先级、去重和 Promise 生命周期 | [README](../packages/notification-define/docs/README.zh.md) |
| `@techmefr/progress-define` | 强类型进度追踪 Composable，支持响应式百分比、比率、剩余值和格式化输出 | [README](../packages/progress-define/docs/README.zh.md) |
| `@techmefr/threshold-define` | 强类型阈值匹配 Composable，基于值范围提供响应式颜色、标签和样式 | [README](../packages/threshold-define/docs/README.zh.md) |

## \u5F00\u53D1

```bash
pnpm install
cd packages/<package-name>
pnpm test
pnpm build
```

## 测试

所有模块遵循可测试性最佳实践。使用 [@techmefr/Datapower](https://github.com/techmefr/Datapower) 实现：
- 生产环境自动清理 data-* 属性
- 单元测试、集成测试和 E2E 测试的测试工具
- 使用 data-test-id、data-test-class、data-state 的标准化方案


## \u8BB8\u53EF\u8BC1

MIT

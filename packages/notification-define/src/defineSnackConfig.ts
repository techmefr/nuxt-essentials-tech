import { ref, computed } from 'vue'
import type {
    ISnackPreset,
    ISnackConfig,
    ISnackReturn,
    ISnackOverrides,
    ISnackItem,
    ISnackUpdateOptions,
    ISnackPromiseHandlers,
    SnackContent,
    SnackShortcut,
} from './types'

const DEFAULT_TIMEOUT = 5000
const DEFAULT_MAX_STACK = 10
const DEFAULT_DEDUP_INTERVAL = 1000

let nextId = 0
function generateId(): string {
    nextId += 1
    return `snack-${nextId}`
}

export const defineSnackConfig = <
    TArgs extends unknown[],
    TPresets extends Record<string, ISnackPreset> = Record<string, ISnackPreset>
>(
    callback: (...args: TArgs) => ISnackConfig<TPresets>
) => {
    return (...args: TArgs): ISnackReturn & { [K in keyof TPresets & string]: SnackShortcut } => {
        const config = callback(...args)
        const presets = config.presets
        const maxStack = config.maxStack ?? DEFAULT_MAX_STACK
        const defaultTimeout = config.defaultTimeout ?? DEFAULT_TIMEOUT
        const deduplicate = config.deduplicate ?? false
        const deduplicateInterval = config.deduplicateInterval ?? DEFAULT_DEDUP_INTERVAL

        const items = ref<ISnackItem[]>([])
        const timers = new Map<string, ReturnType<typeof setTimeout>>()

        const activeCount = computed(() => items.value.filter(n => !n.isClosing).length)

        const clearTimer = (id: string): void => {
            const timer = timers.get(id)
            if (timer) {
                clearTimeout(timer)
                timers.delete(id)
            }
        }

        const dismiss = (id: string): void => {
            clearTimer(id)
            items.value = items.value.filter(n => n.id !== id)
        }

        const dismissAll = (): void => {
            timers.forEach(timer => clearTimeout(timer))
            timers.clear()
            items.value = []
        }

        const closeAll = (): void => {
            items.value = items.value.map(n => ({ ...n, isClosing: true }))
        }

        const clearZone = (slug: string): void => {
            const toRemove = items.value.filter(n => n.slug === slug)
            toRemove.forEach(n => clearTimer(n.id))
            items.value = items.value.filter(n => n.slug !== slug)
        }

        const update = (id: string, options: ISnackUpdateOptions): void => {
            const index = items.value.findIndex(n => n.id === id)
            if (index === -1) return

            const updated = { ...items.value[index] }

            if (options.content !== undefined) updated.content = options.content
            if (options.contentProps !== undefined) updated.contentProps = options.contentProps
            if (options.actions !== undefined) updated.actions = options.actions
            if (options.slug !== undefined) {
                updated.slug = options.slug
                updated.preset = presets[options.slug] ?? updated.preset
            }

            const newItems = [...items.value]
            newItems[index] = updated
            items.value = newItems
        }

        const show = (slug: string, content: SnackContent, overrides?: ISnackOverrides): string => {
            const preset = presets[slug] ?? {}
            const stacking = preset.stacking ?? true

            if (deduplicate && typeof content === 'string') {
                const now = Date.now()
                const duplicate = items.value.find(
                    n =>
                        n.slug === slug &&
                        typeof n.content === 'string' &&
                        n.content === content &&
                        now - n.createdAt < deduplicateInterval
                )
                if (duplicate) return duplicate.id
            }

            if (!stacking) {
                clearZone(slug)
            }

            while (maxStack > 0 && items.value.length >= maxStack) {
                dismiss(items.value[0].id)
            }

            const id = generateId()
            const item: ISnackItem = {
                id,
                slug,
                content,
                contentProps: overrides?.contentProps ?? {},
                actions: overrides?.actions ?? [],
                preset,
                closable: overrides?.closable ?? preset.closable ?? true,
                isClosing: false,
                createdAt: Date.now(),
            }

            const priority = preset.priority ?? 0
            const insertIndex = items.value.findIndex(n => {
                const nPriority = n.preset.priority ?? 0
                return nPriority < priority
            })

            if (insertIndex === -1) {
                items.value = [...items.value, item]
            } else {
                const newItems = [...items.value]
                newItems.splice(insertIndex, 0, item)
                items.value = newItems
            }

            const isPersistent = overrides?.isPersistent ?? false
            const timeout = overrides?.timeout ?? preset.timeout ?? defaultTimeout

            if (timeout > 0 && !isPersistent) {
                const timer = setTimeout(() => dismiss(id), timeout)
                timers.set(id, timer)
            }

            return id
        }

        const promiseHandler = <T>(
            promise: Promise<T>,
            handlers: ISnackPromiseHandlers<T>
        ): Promise<T> => {
            const pendingSlug = handlers.pending.slug ?? 'info'
            const id = show(pendingSlug, handlers.pending.content, { isPersistent: true })

            return promise
                .then(result => {
                    clearTimer(id)

                    const successSlug = handlers.success.slug ?? 'success'
                    const successContent =
                        typeof handlers.success.content === 'function'
                            ? handlers.success.content(result)
                            : handlers.success.content

                    update(id, { slug: successSlug, content: successContent })

                    const timeout = presets[successSlug]?.timeout ?? defaultTimeout
                    if (timeout > 0) {
                        const timer = setTimeout(() => dismiss(id), timeout)
                        timers.set(id, timer)
                    }

                    return result
                })
                .catch((err: Error) => {
                    clearTimer(id)

                    const errorSlug = handlers.error.slug ?? 'error'
                    const errorContent =
                        typeof handlers.error.content === 'function'
                            ? handlers.error.content(err)
                            : handlers.error.content

                    update(id, { slug: errorSlug, content: errorContent })

                    const timeout = presets[errorSlug]?.timeout ?? defaultTimeout
                    if (timeout > 0) {
                        const timer = setTimeout(() => dismiss(id), timeout)
                        timers.set(id, timer)
                    }

                    throw err
                })
        }

        const core: ISnackReturn = {
            items,
            activeCount,
            show,
            promise: promiseHandler,
            dismiss,
            closeAll,
            dismissAll,
            clearZone,
            update,
        }

        const shortcuts: Record<string, SnackShortcut> = {}
        for (const slug of Object.keys(presets)) {
            shortcuts[slug] = (content: SnackContent, overrides?: ISnackOverrides) =>
                show(slug, content, overrides)
        }

        return Object.assign(core, shortcuts) as ISnackReturn & {
            [K in keyof TPresets & string]: SnackShortcut
        }
    }
}

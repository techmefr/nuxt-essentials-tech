import type { Ref, ComputedRef, Component } from 'vue'

export type SnackContent = string | Component

export type SnackPosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'

export interface ISnackPreset {
    color?: string
    textColor?: string
    linkColor?: string
    icon?: string
    elevation?: number
    variant?: string
    timeout?: number
    position?: SnackPosition
    stacking?: boolean
    closable?: boolean
    priority?: number
}

export interface ISnackAction {
    label: string
    handler: () => void
    color?: string
}

export interface ISnackItem {
    id: string
    slug: string
    content: SnackContent
    contentProps: Record<string, unknown>
    actions: ISnackAction[]
    preset: ISnackPreset
    closable: boolean
    isClosing: boolean
    createdAt: number
}

export interface ISnackOverrides {
    contentProps?: Record<string, unknown>
    actions?: ISnackAction[]
    timeout?: number
    isPersistent?: boolean
    closable?: boolean
}

export interface ISnackUpdateOptions {
    content?: SnackContent
    contentProps?: Record<string, unknown>
    actions?: ISnackAction[]
    slug?: string
}

export type SnackPromiseResolver<T> = (data: T) => string

export interface ISnackPromiseHandlers<T> {
    pending: { slug?: string; content: SnackContent }
    success: { slug?: string; content: string | SnackPromiseResolver<T> }
    error: { slug?: string; content: string | SnackPromiseResolver<Error> }
}

export interface ISnackConfig<TPresets extends Record<string, ISnackPreset> = Record<string, ISnackPreset>> {
    presets: TPresets
    maxStack?: number
    defaultTimeout?: number
    deduplicate?: boolean
    deduplicateInterval?: number
}

export type SnackShortcut = (content: SnackContent, overrides?: ISnackOverrides) => string

export interface ISnackReturn {
    items: Ref<ISnackItem[]>
    activeCount: ComputedRef<number>
    show: (slug: string, content: SnackContent, overrides?: ISnackOverrides) => string
    promise: <T>(promise: Promise<T>, handlers: ISnackPromiseHandlers<T>) => Promise<T>
    dismiss: (id: string) => void
    closeAll: () => void
    dismissAll: () => void
    clearZone: (slug: string) => void
    update: (id: string, options: ISnackUpdateOptions) => void
}

import type { Ref, ComputedRef } from 'vue'

export type ColorSlug = 'fillrate' | 'stock'

export type ColorLevel = 'success' | 'warning' | 'error'

export interface IColorConfig {
    slug: ColorSlug
    reverse?: boolean
}

export interface IColorReturn {
    value: Ref<number | null>
    color: ComputedRef<ColorLevel | null>
    label: ComputedRef<ColorLevel | null>
    style: ComputedRef<{ color: string } | null>
    setValue: (v: number) => void
    reset: () => void
}

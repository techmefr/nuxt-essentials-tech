import type { Ref, ComputedRef } from 'vue'

export interface IRatioConfig {
    current?: number
    max: number
}

export interface IRatioReturn {
    current: Ref<number>
    max: Ref<number>
    percentage: ComputedRef<number>
    ratio: ComputedRef<number>
    remaining: ComputedRef<number>
    isComplete: ComputedRef<boolean>
    setCurrent: (value: number) => void
    setMax: (value: number) => void
    reset: () => void
}

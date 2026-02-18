import type { Ref, ComputedRef } from 'vue'

export type ProgressUnit = 'percent' | 'number'

export interface IProgressConfig {
    max: number
    unit?: ProgressUnit
    precision?: number
}

export interface IProgressReturn {
    current: Ref<number>
    max: Ref<number>
    percentage: ComputedRef<number>
    formatted: ComputedRef<string>
    ratio: ComputedRef<number>
    remaining: ComputedRef<number>
    isComplete: ComputedRef<boolean>
    setCurrent: (value: number) => void
    setMax: (value: number) => void
    reset: () => void
}

import type { Ref, ComputedRef } from 'vue'

export interface IThresholdStep {
    min: number
    max: number
    color: string
    textColor?: string
    label?: string
}

export interface IThresholdConfig {
    thresholds: IThresholdStep[]
    fallback?: Partial<IThresholdStep>
}

export interface IThresholdReturn {
    value: Ref<number | null>
    match: ComputedRef<Partial<IThresholdStep> | null>
    color: ComputedRef<string | null>
    textColor: ComputedRef<string | null>
    label: ComputedRef<string | null>
    style: ComputedRef<{ color: string; backgroundColor: string } | null>
    setValue: (value: number) => void
    reset: () => void
}

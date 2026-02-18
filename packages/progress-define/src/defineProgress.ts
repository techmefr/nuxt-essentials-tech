import { ref, computed } from 'vue'
import type { IProgressConfig, IProgressReturn } from './types'

const DEFAULT_PRECISION = 0

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

function round(value: number, precision: number): number {
    const factor = Math.pow(10, precision)
    return Math.round(value * factor) / factor
}

export function defineProgress<TArgs extends unknown[]>(
    callback: (...args: TArgs) => IProgressConfig
): (...args: TArgs) => IProgressReturn {
    return (...args: TArgs) => {
        const config = callback(...args)
        const precision = config.precision ?? DEFAULT_PRECISION
        const unit = config.unit ?? 'percent'

        const current = ref(0)
        const max = ref(config.max)

        const percentage = computed(() => {
            if (max.value <= 0) return 0
            return round((current.value / max.value) * 100, precision)
        })

        const ratio = computed(() => {
            if (max.value <= 0) return 0
            return round(current.value / max.value, precision + 2)
        })

        const remaining = computed(() => round(max.value - current.value, precision))

        const isComplete = computed(() => current.value >= max.value)

        const formatted = computed(() => {
            if (unit === 'percent') return `${percentage.value}%`
            return `${current.value} / ${max.value}`
        })

        const setCurrent = (value: number): void => {
            current.value = clamp(value, 0, max.value)
        }

        const setMax = (value: number): void => {
            max.value = value
            current.value = clamp(current.value, 0, value)
        }

        const reset = (): void => {
            current.value = 0
        }

        return {
            current,
            max,
            percentage,
            formatted,
            ratio,
            remaining,
            isComplete,
            setCurrent,
            setMax,
            reset,
        }
    }
}

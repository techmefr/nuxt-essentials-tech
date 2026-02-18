import { ref, computed } from 'vue'
import type { IRatioConfig, IRatioReturn } from './types'

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

export const defineRatio = <TArgs extends unknown[]>(
    callback: (...args: TArgs) => IRatioConfig
) => {
    return (...args: TArgs): IRatioReturn => {
        const config = callback(...args)

        const current = ref(clamp(config.current ?? 0, 0, config.max))
        const max = ref(config.max)

        const percentage = computed(() => {
            if (max.value <= 0) return 0
            return Math.round((current.value / max.value) * 100)
        })

        const ratio = computed(() => {
            if (max.value <= 0) return 0
            return Math.round((current.value / max.value) * 100) / 100
        })

        const remaining = computed(() => max.value - current.value)

        const isComplete = computed(() => current.value >= max.value)

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
            ratio,
            remaining,
            isComplete,
            setCurrent,
            setMax,
            reset,
        }
    }
}

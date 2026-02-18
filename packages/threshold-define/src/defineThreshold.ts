import { ref, computed } from 'vue'
import type { IThresholdConfig, IThresholdReturn, IThresholdStep } from './types'

const DEFAULT_FALLBACK: Partial<IThresholdStep> = {
    color: '#9E9E9E',
    textColor: '#fff',
    label: 'unknown',
}

export function defineThreshold<TArgs extends unknown[]>(
    callback: (...args: TArgs) => IThresholdConfig
): (...args: TArgs) => IThresholdReturn {
    return (...args: TArgs) => {
        const config = callback(...args)
        const thresholds = config.thresholds
        const fallback = config.fallback ?? DEFAULT_FALLBACK

        const value = ref<number | null>(null)

        const match = computed<Partial<IThresholdStep> | null>(() => {
            if (value.value === null) return null
            const v = value.value
            const found = thresholds.find(t => v >= t.min && v < t.max)
            return found ?? fallback
        })

        const color = computed(() => match.value?.color ?? null)
        const textColor = computed(() => match.value?.textColor ?? null)
        const label = computed(() => match.value?.label ?? null)

        const style = computed(() => {
            if (!match.value?.color) return null
            return {
                color: match.value.textColor ?? '#fff',
                backgroundColor: match.value.color,
            }
        })

        const setValue = (v: number): void => {
            value.value = v
        }

        const reset = (): void => {
            value.value = null
        }

        return {
            value,
            match,
            color,
            textColor,
            label,
            style,
            setValue,
            reset,
        }
    }
}

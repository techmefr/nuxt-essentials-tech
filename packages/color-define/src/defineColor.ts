import { ref, computed } from 'vue'
import type { ColorLevel, ColorSlug, IColorConfig, IColorReturn } from './types'

interface IColorRange {
    min: number
    max: number
    level: ColorLevel
}

const COLOR_HEX: Record<ColorLevel, string> = {
    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#F44336',
}

const SLUG_RANGES: Record<ColorSlug, IColorRange[]> = {
    fillrate: [
        { min: 0, max: 70, level: 'success' },
        { min: 70, max: 90, level: 'warning' },
        { min: 90, max: Infinity, level: 'error' },
    ],
    stock: [
        { min: 0, max: 30, level: 'error' },
        { min: 30, max: 70, level: 'warning' },
        { min: 70, max: Infinity, level: 'success' },
    ],
}

function reverseLevel(level: ColorLevel): ColorLevel {
    if (level === 'success') return 'error'
    if (level === 'error') return 'success'
    return 'warning'
}

export const defineColor = <TArgs extends unknown[]>(
    callback: (...args: TArgs) => IColorConfig
) => {
    return (...args: TArgs): IColorReturn => {
        const config = callback(...args)
        const ranges = SLUG_RANGES[config.slug]
        const isReverse = config.reverse ?? false

        const value = ref<number | null>(null)

        const color = computed<ColorLevel | null>(() => {
            if (value.value === null) return null
            const v = value.value
            const found = ranges.find(r => v >= r.min && v < r.max)
            if (!found) return null
            return isReverse ? reverseLevel(found.level) : found.level
        })

        const label = computed<ColorLevel | null>(() => color.value)

        const style = computed<{ color: string } | null>(() => {
            if (color.value === null) return null
            return { color: COLOR_HEX[color.value] }
        })

        const setValue = (v: number): void => {
            value.value = v
        }

        const reset = (): void => {
            value.value = null
        }

        return { value, color, label, style, setValue, reset }
    }
}

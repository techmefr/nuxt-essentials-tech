import { ref, computed } from 'vue'
import { isValid as isValidDate } from 'date-fns'
import type { Locale } from 'date-fns'
import type { IDateConfig, IDateReturn } from './types'
import { DEFAULT_DATE_FORMAT, formatDate, isWithinBounds } from './helpers'

export const defineDate = <TArgs extends unknown[]>(
    callback: (...args: TArgs) => IDateConfig
) => {
    return (...args: TArgs): IDateReturn => {
        const config = callback(...args)
        const dateFormat = config.format ?? DEFAULT_DATE_FORMAT
        const timezone = config.timezone

        const date = ref<Date | null>(null)
        const locale = ref<Locale | undefined>(config.locale)
        const minDate = ref<Date | null>(config.minDate ?? null)
        const maxDate = ref<Date | null>(config.maxDate ?? null)

        const isValid = computed(() => {
            if (!date.value || !isValidDate(date.value)) return false
            return isWithinBounds(date.value, minDate.value, maxDate.value)
        })

        const formatted = computed(() => {
            if (!date.value || !isValidDate(date.value)) return null
            return formatDate(date.value, dateFormat, locale.value, timezone)
        })

        const setDate = (value: Date | null) => {
            date.value = value
        }

        const setLocale = (value: Locale) => {
            locale.value = value
        }

        const setMinDate = (value: Date | null) => {
            minDate.value = value
        }

        const setMaxDate = (value: Date | null) => {
            maxDate.value = value
        }

        const reset = () => {
            date.value = null
        }

        return {
            date,
            locale,
            formatted,
            minDate,
            maxDate,
            isValid,
            setDate,
            setLocale,
            setMinDate,
            setMaxDate,
            reset,
        }
    }
}

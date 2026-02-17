import { ref, computed } from 'vue'
import { isAfter, isValid as isValidDate, isBefore } from 'date-fns'
import type { Locale } from 'date-fns'
import type { IDateRangeConfig, IDateRangeReturn } from './types'
import { DEFAULT_DATE_FORMAT, DEFAULT_RANGE_SEPARATOR, formatDate } from './helpers'

export const defineDateRange = <TArgs extends unknown[]>(
    callback: (...args: TArgs) => IDateRangeConfig
) => {
    return (...args: TArgs): IDateRangeReturn => {
        const config = callback(...args)
        const rangeFormat = config.format ?? DEFAULT_DATE_FORMAT
        const separator = config.separator ?? DEFAULT_RANGE_SEPARATOR
        const timezone = config.timezone

        const start = ref<Date | null>(null)
        const end = ref<Date | null>(null)
        const locale = ref<Locale | undefined>(config.locale)
        const minDate = ref<Date | null>(config.minDate ?? null)
        const maxDate = ref<Date | null>(config.maxDate ?? null)

        const isValid = computed(() => {
            if (!start.value || !end.value) return false
            if (!isValidDate(start.value) || !isValidDate(end.value)) return false
            if (isAfter(start.value, end.value)) return false
            if (minDate.value && isBefore(start.value, minDate.value)) return false
            if (maxDate.value && isAfter(end.value, maxDate.value)) return false
            return true
        })

        const formattedStart = computed(() => {
            if (!start.value || !isValidDate(start.value)) return null
            return formatDate(start.value, rangeFormat, locale.value, timezone)
        })

        const formattedEnd = computed(() => {
            if (!end.value || !isValidDate(end.value)) return null
            return formatDate(end.value, rangeFormat, locale.value, timezone)
        })

        const formattedRange = computed(() => {
            if (!formattedStart.value || !formattedEnd.value) return null
            return `${formattedStart.value}${separator}${formattedEnd.value}`
        })

        const setStart = (value: Date | null) => {
            start.value = value
        }

        const setEnd = (value: Date | null) => {
            end.value = value
        }

        const setRange = (s: Date | null, e: Date | null) => {
            start.value = s
            end.value = e
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
            start.value = null
            end.value = null
        }

        return {
            start,
            end,
            locale,
            formattedStart,
            formattedEnd,
            formattedRange,
            minDate,
            maxDate,
            isValid,
            setStart,
            setEnd,
            setRange,
            setLocale,
            setMinDate,
            setMaxDate,
            reset,
        }
    }
}

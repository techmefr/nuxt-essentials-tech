import { ref, computed } from 'vue'
import { isValid as isValidDate } from 'date-fns'
import type { Locale } from 'date-fns'
import type { IDateTimeConfig, IDateTimeReturn } from './types'
import { DEFAULT_DATETIME_FORMAT, formatDate, isWithinBounds } from './helpers'

export const defineDateTime = <TArgs extends unknown[]>(
    callback: (...args: TArgs) => IDateTimeConfig
) => {
    return (...args: TArgs): IDateTimeReturn => {
        const config = callback(...args)
        const dtFormat = config.format ?? DEFAULT_DATETIME_FORMAT
        const timezone = config.timezone

        const date = ref<Date | null>(null)
        const time = ref<string | null>(null)
        const locale = ref<Locale | undefined>(config.locale)
        const minDate = ref<Date | null>(config.minDate ?? null)
        const maxDate = ref<Date | null>(config.maxDate ?? null)

        const combined = computed(() => {
            if (!date.value || !isValidDate(date.value)) return null
            if (!time.value) return date.value

            const [hoursStr, minutesStr, secondsStr] = time.value.split(':')
            const hours = Number(hoursStr)
            const minutes = Number(minutesStr)
            const seconds = secondsStr ? Number(secondsStr) : 0

            if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return date.value

            const result = new Date(date.value)
            result.setHours(hours, minutes, seconds, 0)
            return result
        })

        const isValid = computed(() => {
            if (!combined.value) return false
            return isWithinBounds(combined.value, minDate.value, maxDate.value)
        })

        const formatted = computed(() => {
            if (!combined.value) return null
            return formatDate(combined.value, dtFormat, locale.value, timezone)
        })

        const setDate = (value: Date | null) => {
            date.value = value
        }

        const setTime = (value: string | null) => {
            time.value = value
        }

        const setDateTime = (d: Date | null, t: string | null) => {
            date.value = d
            time.value = t
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
            time.value = null
        }

        return {
            date,
            time,
            combined,
            locale,
            formatted,
            minDate,
            maxDate,
            isValid,
            setDate,
            setTime,
            setDateTime,
            setLocale,
            setMinDate,
            setMaxDate,
            reset,
        }
    }
}

import { format as fnsFormat, isAfter, isBefore } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import type { Locale } from 'date-fns'

export const DEFAULT_DATE_FORMAT = 'PP'
export const DEFAULT_DATETIME_FORMAT = 'PPp'
export const DEFAULT_RANGE_SEPARATOR = ' - '

export function formatDate(
    date: Date,
    formatStr: string,
    locale: Locale | undefined,
    timezone: string | undefined
): string {
    const options = locale ? { locale } : {}

    if (timezone) {
        return formatInTimeZone(date, timezone, formatStr, options)
    }

    return fnsFormat(date, formatStr, options)
}

export function isWithinBounds(
    date: Date,
    minDate: Date | null,
    maxDate: Date | null
): boolean {
    if (minDate && isBefore(date, minDate)) return false
    if (maxDate && isAfter(date, maxDate)) return false
    return true
}

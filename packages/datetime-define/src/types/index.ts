import type { Ref, ComputedRef } from 'vue'
import type { Locale } from 'date-fns'

export interface IDateTimeBaseConfig {
    locale?: Locale
    timezone?: string
    format?: string
    minDate?: Date | null
    maxDate?: Date | null
}

export interface IDateConfig extends IDateTimeBaseConfig {}

export interface IDateTimeConfig extends IDateTimeBaseConfig {}

export interface IDateRangeConfig extends IDateTimeBaseConfig {
    separator?: string
}

export interface IDateReturn {
    date: Ref<Date | null>
    locale: Ref<Locale | undefined>
    formatted: ComputedRef<string | null>
    minDate: Ref<Date | null>
    maxDate: Ref<Date | null>
    isValid: ComputedRef<boolean>
    setDate: (value: Date | null) => void
    setLocale: (value: Locale) => void
    setMinDate: (value: Date | null) => void
    setMaxDate: (value: Date | null) => void
    reset: () => void
}

export interface IDateTimeReturn {
    date: Ref<Date | null>
    time: Ref<string | null>
    combined: ComputedRef<Date | null>
    locale: Ref<Locale | undefined>
    formatted: ComputedRef<string | null>
    minDate: Ref<Date | null>
    maxDate: Ref<Date | null>
    isValid: ComputedRef<boolean>
    setDate: (value: Date | null) => void
    setTime: (value: string | null) => void
    setDateTime: (date: Date | null, time: string | null) => void
    setLocale: (value: Locale) => void
    setMinDate: (value: Date | null) => void
    setMaxDate: (value: Date | null) => void
    reset: () => void
}

export interface IDateRangeReturn {
    start: Ref<Date | null>
    end: Ref<Date | null>
    locale: Ref<Locale | undefined>
    formattedStart: ComputedRef<string | null>
    formattedEnd: ComputedRef<string | null>
    formattedRange: ComputedRef<string | null>
    minDate: Ref<Date | null>
    maxDate: Ref<Date | null>
    isValid: ComputedRef<boolean>
    setStart: (value: Date | null) => void
    setEnd: (value: Date | null) => void
    setRange: (start: Date | null, end: Date | null) => void
    setLocale: (value: Locale) => void
    setMinDate: (value: Date | null) => void
    setMaxDate: (value: Date | null) => void
    reset: () => void
}

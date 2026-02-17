import { describe, it, expect } from 'vitest'
import { format } from 'date-fns'
import { fr, de } from 'date-fns/locale'
import { formatInTimeZone } from 'date-fns-tz'
import { defineDate } from '../defineDate'

describe('defineDate', () => {
    it('creates with default values', () => {
        const useDate = defineDate<[]>(() => ({}))
        const dt = useDate()

        expect(dt.date.value).toBeNull()
        expect(dt.minDate.value).toBeNull()
        expect(dt.maxDate.value).toBeNull()
        expect(dt.isValid.value).toBe(false)
        expect(dt.formatted.value).toBeNull()
    })

    it('sets date', () => {
        const useDate = defineDate<[]>(() => ({}))
        const dt = useDate()

        dt.setDate(new Date(2024, 5, 15))

        expect(dt.date.value).toEqual(new Date(2024, 5, 15))
        expect(dt.isValid.value).toBe(true)
    })

    it('validates with minDate', () => {
        const useDate = defineDate<[]>(() => ({
            minDate: new Date(2024, 0, 1),
        }))
        const dt = useDate()

        dt.setDate(new Date(2023, 11, 15))
        expect(dt.isValid.value).toBe(false)

        dt.setDate(new Date(2024, 5, 15))
        expect(dt.isValid.value).toBe(true)
    })

    it('validates with maxDate', () => {
        const useDate = defineDate<[]>(() => ({
            maxDate: new Date(2024, 11, 31),
        }))
        const dt = useDate()

        dt.setDate(new Date(2025, 0, 15))
        expect(dt.isValid.value).toBe(false)

        dt.setDate(new Date(2024, 5, 15))
        expect(dt.isValid.value).toBe(true)
    })

    it('updates limits dynamically', () => {
        const useDate = defineDate<[]>(() => ({}))
        const dt = useDate()

        dt.setDate(new Date(2024, 5, 15))
        expect(dt.isValid.value).toBe(true)

        dt.setMinDate(new Date(2024, 6, 1))
        expect(dt.isValid.value).toBe(false)

        dt.setMinDate(null)
        dt.setMaxDate(new Date(2024, 4, 1))
        expect(dt.isValid.value).toBe(false)
    })

    it('resets date', () => {
        const useDate = defineDate<[]>(() => ({}))
        const dt = useDate()

        dt.setDate(new Date(2024, 5, 15))
        dt.reset()

        expect(dt.date.value).toBeNull()
        expect(dt.formatted.value).toBeNull()
    })

    it('passes arguments to config', () => {
        const useDate = defineDate<[Date]>(minDate => ({ minDate }))
        const dt = useDate(new Date(2024, 0, 1))

        dt.setDate(new Date(2023, 11, 15))
        expect(dt.isValid.value).toBe(false)
    })

    it('rejects invalid Date objects', () => {
        const useDate = defineDate<[]>(() => ({}))
        const dt = useDate()

        dt.setDate(new Date('invalid'))

        expect(dt.isValid.value).toBe(false)
        expect(dt.formatted.value).toBeNull()
    })

    it('formats with default PP format', () => {
        const useDate = defineDate<[]>(() => ({}))
        const dt = useDate()
        const testDate = new Date(2024, 5, 15)

        dt.setDate(testDate)

        expect(dt.formatted.value).toBe(format(testDate, 'PP'))
    })

    it('formats with custom format', () => {
        const useDate = defineDate<[]>(() => ({ format: 'yyyy-MM-dd' }))
        const dt = useDate()

        dt.setDate(new Date(2024, 5, 15))

        expect(dt.formatted.value).toBe('2024-06-15')
    })

    it('formats with locale', () => {
        const useDate = defineDate<[]>(() => ({ locale: fr }))
        const dt = useDate()
        const testDate = new Date(2024, 5, 15)

        dt.setDate(testDate)

        expect(dt.formatted.value).toBe(format(testDate, 'PP', { locale: fr }))
    })

    it('updates formatted when locale changes via setLocale', () => {
        const useDate = defineDate<[]>(() => ({}))
        const dt = useDate()
        const testDate = new Date(2024, 5, 15)

        dt.setDate(testDate)
        const defaultFormatted = dt.formatted.value

        dt.setLocale(fr)
        const frFormatted = dt.formatted.value

        dt.setLocale(de)
        const deFormatted = dt.formatted.value

        expect(defaultFormatted).toBe(format(testDate, 'PP'))
        expect(frFormatted).toBe(format(testDate, 'PP', { locale: fr }))
        expect(deFormatted).toBe(format(testDate, 'PP', { locale: de }))
    })

    it('formats with timezone', () => {
        const useDate = defineDate<[]>(() => ({
            timezone: 'America/New_York',
            format: 'yyyy-MM-dd HH:mm',
        }))
        const dt = useDate()
        const testDate = new Date('2024-06-15T12:00:00Z')

        dt.setDate(testDate)

        expect(dt.formatted.value).toBe(
            formatInTimeZone(testDate, 'America/New_York', 'yyyy-MM-dd HH:mm')
        )
    })
})

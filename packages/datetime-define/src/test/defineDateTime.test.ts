import { describe, it, expect } from 'vitest'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { formatInTimeZone } from 'date-fns-tz'
import { defineDateTime } from '../defineDateTime'

describe('defineDateTime', () => {
    it('creates with default values', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()

        expect(dt.date.value).toBeNull()
        expect(dt.time.value).toBeNull()
        expect(dt.combined.value).toBeNull()
        expect(dt.isValid.value).toBe(false)
        expect(dt.formatted.value).toBeNull()
    })

    it('sets date and time separately', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()

        dt.setDate(new Date(2024, 5, 15))
        dt.setTime('14:30')

        expect(dt.date.value).toEqual(new Date(2024, 5, 15))
        expect(dt.time.value).toBe('14:30')
    })

    it('setDateTime sets both values', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()

        dt.setDateTime(new Date(2024, 5, 15), '14:30')

        expect(dt.date.value).toEqual(new Date(2024, 5, 15))
        expect(dt.time.value).toBe('14:30')
    })

    it('combines date and time', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()

        dt.setDateTime(new Date(2024, 5, 15), '14:30')

        expect(dt.combined.value?.getHours()).toBe(14)
        expect(dt.combined.value?.getMinutes()).toBe(30)
    })

    it('returns date only when no time set', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()

        dt.setDate(new Date(2024, 5, 15))

        expect(dt.combined.value).toEqual(new Date(2024, 5, 15))
    })

    it('handles time with seconds', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()

        dt.setDateTime(new Date(2024, 5, 15), '14:30:45')

        expect(dt.combined.value?.getHours()).toBe(14)
        expect(dt.combined.value?.getMinutes()).toBe(30)
        expect(dt.combined.value?.getSeconds()).toBe(45)
    })

    it('validates combined with min/max', () => {
        const useDt = defineDateTime<[]>(() => ({
            minDate: new Date(2024, 5, 15, 10, 0),
        }))
        const dt = useDt()

        dt.setDateTime(new Date(2024, 5, 15), '09:00')
        expect(dt.isValid.value).toBe(false)

        dt.setTime('11:00')
        expect(dt.isValid.value).toBe(true)
    })

    it('resets datetime', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()

        dt.setDateTime(new Date(2024, 5, 15), '14:30')
        dt.reset()

        expect(dt.date.value).toBeNull()
        expect(dt.time.value).toBeNull()
        expect(dt.formatted.value).toBeNull()
    })

    it('formats combined datetime with default PPp format', () => {
        const useDt = defineDateTime<[]>(() => ({}))
        const dt = useDt()
        const testDate = new Date(2024, 5, 15)

        dt.setDateTime(testDate, '14:30')

        const expectedCombined = new Date(2024, 5, 15)
        expectedCombined.setHours(14, 30, 0, 0)
        expect(dt.formatted.value).toBe(format(expectedCombined, 'PPp'))
    })

    it('formats with locale', () => {
        const useDt = defineDateTime<[]>(() => ({ locale: fr }))
        const dt = useDt()
        const testDate = new Date(2024, 5, 15)

        dt.setDateTime(testDate, '14:30')

        const expectedCombined = new Date(2024, 5, 15)
        expectedCombined.setHours(14, 30, 0, 0)
        expect(dt.formatted.value).toBe(
            format(expectedCombined, 'PPp', { locale: fr })
        )
    })

    it('formats with timezone', () => {
        const useDt = defineDateTime<[]>(() => ({
            timezone: 'Asia/Tokyo',
            format: 'yyyy-MM-dd HH:mm',
        }))
        const dt = useDt()
        const testDate = new Date('2024-06-15T12:00:00Z')

        dt.setDateTime(testDate, '14:30')

        const expectedCombined = new Date(testDate)
        expectedCombined.setHours(14, 30, 0, 0)
        expect(dt.formatted.value).toBe(
            formatInTimeZone(expectedCombined, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm')
        )
    })
})

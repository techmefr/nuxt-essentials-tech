import { describe, it, expect } from 'vitest'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { defineDateRange } from '../defineDateRange'

describe('defineDateRange', () => {
    it('creates with default values', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()

        expect(dt.start.value).toBeNull()
        expect(dt.end.value).toBeNull()
        expect(dt.isValid.value).toBe(false)
        expect(dt.formattedStart.value).toBeNull()
        expect(dt.formattedEnd.value).toBeNull()
        expect(dt.formattedRange.value).toBeNull()
    })

    it('sets start and end', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()

        dt.setStart(new Date(2024, 5, 1))
        dt.setEnd(new Date(2024, 5, 30))

        expect(dt.start.value).toEqual(new Date(2024, 5, 1))
        expect(dt.end.value).toEqual(new Date(2024, 5, 30))
        expect(dt.isValid.value).toBe(true)
    })

    it('setRange sets both values', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()

        dt.setRange(new Date(2024, 5, 1), new Date(2024, 5, 30))

        expect(dt.start.value).toEqual(new Date(2024, 5, 1))
        expect(dt.end.value).toEqual(new Date(2024, 5, 30))
    })

    it('is invalid when only start is set', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()

        dt.setStart(new Date(2024, 5, 1))
        expect(dt.isValid.value).toBe(false)
    })

    it('is invalid when start is after end', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()

        dt.setRange(new Date(2024, 5, 30), new Date(2024, 5, 1))
        expect(dt.isValid.value).toBe(false)
    })

    it('validates with min/max', () => {
        const useRange = defineDateRange<[]>(() => ({
            minDate: new Date(2024, 0, 1),
            maxDate: new Date(2024, 11, 31),
        }))
        const dt = useRange()

        dt.setRange(new Date(2023, 11, 1), new Date(2024, 5, 30))
        expect(dt.isValid.value).toBe(false)

        dt.setRange(new Date(2024, 5, 1), new Date(2025, 0, 15))
        expect(dt.isValid.value).toBe(false)

        dt.setRange(new Date(2024, 5, 1), new Date(2024, 5, 30))
        expect(dt.isValid.value).toBe(true)
    })

    it('resets range', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()

        dt.setRange(new Date(2024, 5, 1), new Date(2024, 5, 30))
        dt.reset()

        expect(dt.start.value).toBeNull()
        expect(dt.end.value).toBeNull()
    })

    it('formats start and end dates', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()
        const startDate = new Date(2024, 5, 1)
        const endDate = new Date(2024, 5, 30)

        dt.setRange(startDate, endDate)

        expect(dt.formattedStart.value).toBe(format(startDate, 'PP'))
        expect(dt.formattedEnd.value).toBe(format(endDate, 'PP'))
    })

    it('formats range with default separator', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()
        const startDate = new Date(2024, 5, 1)
        const endDate = new Date(2024, 5, 30)

        dt.setRange(startDate, endDate)

        const expected = `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`
        expect(dt.formattedRange.value).toBe(expected)
    })

    it('formats range with custom separator', () => {
        const useRange = defineDateRange<[]>(() => ({ separator: ' to ' }))
        const dt = useRange()
        const startDate = new Date(2024, 5, 1)
        const endDate = new Date(2024, 5, 30)

        dt.setRange(startDate, endDate)

        const expected = `${format(startDate, 'PP')} to ${format(endDate, 'PP')}`
        expect(dt.formattedRange.value).toBe(expected)
    })

    it('formats with locale', () => {
        const useRange = defineDateRange<[]>(() => ({ locale: fr }))
        const dt = useRange()
        const startDate = new Date(2024, 5, 1)
        const endDate = new Date(2024, 5, 30)

        dt.setRange(startDate, endDate)

        expect(dt.formattedStart.value).toBe(
            format(startDate, 'PP', { locale: fr })
        )
        expect(dt.formattedEnd.value).toBe(
            format(endDate, 'PP', { locale: fr })
        )
    })

    it('updates formatted range when locale changes', () => {
        const useRange = defineDateRange<[]>(() => ({}))
        const dt = useRange()
        const startDate = new Date(2024, 5, 1)
        const endDate = new Date(2024, 5, 30)

        dt.setRange(startDate, endDate)
        const defaultRange = dt.formattedRange.value

        dt.setLocale(fr)
        const frRange = dt.formattedRange.value

        expect(defaultRange).not.toBe(frRange)
        const expectedFr = `${format(startDate, 'PP', { locale: fr })} - ${format(endDate, 'PP', { locale: fr })}`
        expect(frRange).toBe(expectedFr)
    })
})

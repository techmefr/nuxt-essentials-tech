import { describe, it, expect } from 'vitest'
import { defineColor } from '../defineColor'

describe('defineColor', () => {
    describe('initial state', () => {
        it('starts with null value', () => {
            const useColor = defineColor<[]>(() => ({ slug: 'fillrate' }))
            const color = useColor()

            expect(color.value.value).toBe(null)
            expect(color.color.value).toBe(null)
            expect(color.style.value).toBe(null)
        })
    })

    describe('fillrate slug', () => {
        const createFillrate = () => {
            const useColor = defineColor<[]>(() => ({ slug: 'fillrate' }))
            return useColor()
        }

        it('returns success for value under 70', () => {
            const color = createFillrate()
            color.setValue(50)

            expect(color.color.value).toBe('success')
            expect(color.label.value).toBe('success')
            expect(color.style.value).toEqual({ color: '#4CAF50' })
        })

        it('returns warning for value between 70 and 90', () => {
            const color = createFillrate()
            color.setValue(75)

            expect(color.color.value).toBe('warning')
            expect(color.style.value).toEqual({ color: '#FB8C00' })
        })

        it('returns error for value 90 and above', () => {
            const color = createFillrate()
            color.setValue(95)

            expect(color.color.value).toBe('error')
            expect(color.style.value).toEqual({ color: '#F44336' })
        })

        it('returns success at boundary 0', () => {
            const color = createFillrate()
            color.setValue(0)

            expect(color.color.value).toBe('success')
        })

        it('returns warning at boundary 70', () => {
            const color = createFillrate()
            color.setValue(70)

            expect(color.color.value).toBe('warning')
        })

        it('returns error at boundary 90', () => {
            const color = createFillrate()
            color.setValue(90)

            expect(color.color.value).toBe('error')
        })
    })

    describe('stock slug', () => {
        const createStock = () => {
            const useColor = defineColor<[]>(() => ({ slug: 'stock' }))
            return useColor()
        }

        it('returns error for value under 30', () => {
            const color = createStock()
            color.setValue(10)

            expect(color.color.value).toBe('error')
            expect(color.style.value).toEqual({ color: '#F44336' })
        })

        it('returns warning for value between 30 and 70', () => {
            const color = createStock()
            color.setValue(50)

            expect(color.color.value).toBe('warning')
            expect(color.style.value).toEqual({ color: '#FB8C00' })
        })

        it('returns success for value 70 and above', () => {
            const color = createStock()
            color.setValue(80)

            expect(color.color.value).toBe('success')
            expect(color.style.value).toEqual({ color: '#4CAF50' })
        })
    })

    describe('reverse option', () => {
        it('swaps success and error for fillrate', () => {
            const useColor = defineColor<[]>(() => ({ slug: 'fillrate', reverse: true }))
            const color = useColor()

            color.setValue(50)
            expect(color.color.value).toBe('error')

            color.setValue(75)
            expect(color.color.value).toBe('warning')

            color.setValue(95)
            expect(color.color.value).toBe('success')
        })
    })

    describe('reset', () => {
        it('resets value to null', () => {
            const useColor = defineColor<[]>(() => ({ slug: 'fillrate' }))
            const color = useColor()

            color.setValue(50)
            color.reset()

            expect(color.value.value).toBe(null)
            expect(color.color.value).toBe(null)
            expect(color.style.value).toBe(null)
        })
    })

    describe('independent instances', () => {
        it('creates independent instances', () => {
            const useColor = defineColor<[]>(() => ({ slug: 'fillrate' }))
            const a = useColor()
            const b = useColor()

            a.setValue(50)

            expect(a.color.value).toBe('success')
            expect(b.color.value).toBe(null)
        })
    })
})

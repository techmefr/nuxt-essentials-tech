import { describe, it, expect } from 'vitest'
import { defineRatio } from '../defineRatio'

describe('defineRatio', () => {
    const createRatio = () => {
        const useRatio = defineRatio<[]>(() => ({ max: 100 }))
        return useRatio()
    }

    describe('initial state', () => {
        it('starts with current at 0', () => {
            const ratio = createRatio()
            expect(ratio.current.value).toBe(0)
        })

        it('starts with configured max', () => {
            const ratio = createRatio()
            expect(ratio.max.value).toBe(100)
        })

        it('starts with percentage at 0', () => {
            const ratio = createRatio()
            expect(ratio.percentage.value).toBe(0)
        })

        it('starts not complete', () => {
            const ratio = createRatio()
            expect(ratio.isComplete.value).toBe(false)
        })

        it('uses initial current from config', () => {
            const useRatio = defineRatio<[]>(() => ({ current: 50, max: 100 }))
            const ratio = useRatio()
            expect(ratio.current.value).toBe(50)
            expect(ratio.percentage.value).toBe(50)
        })
    })

    describe('setCurrent', () => {
        it('updates current and percentage', () => {
            const ratio = createRatio()
            ratio.setCurrent(45)

            expect(ratio.current.value).toBe(45)
            expect(ratio.percentage.value).toBe(45)
        })

        it('clamps current to max', () => {
            const ratio = createRatio()
            ratio.setCurrent(150)

            expect(ratio.current.value).toBe(100)
        })

        it('clamps current to 0', () => {
            const ratio = createRatio()
            ratio.setCurrent(-10)

            expect(ratio.current.value).toBe(0)
        })
    })

    describe('computed values', () => {
        it('computes ratio between 0 and 1', () => {
            const ratio = createRatio()
            ratio.setCurrent(50)

            expect(ratio.ratio.value).toBe(0.5)
        })

        it('computes remaining', () => {
            const ratio = createRatio()
            ratio.setCurrent(30)

            expect(ratio.remaining.value).toBe(70)
        })

        it('isComplete when current equals max', () => {
            const ratio = createRatio()
            ratio.setCurrent(100)

            expect(ratio.isComplete.value).toBe(true)
        })

        it('percentage is rounded to 0 decimals', () => {
            const useRatio = defineRatio<[]>(() => ({ max: 3 }))
            const ratio = useRatio()
            ratio.setCurrent(1)

            expect(ratio.percentage.value).toBe(33)
        })

        it('ratio is rounded to 2 decimals', () => {
            const useRatio = defineRatio<[]>(() => ({ max: 3 }))
            const ratio = useRatio()
            ratio.setCurrent(1)

            expect(ratio.ratio.value).toBe(0.33)
        })
    })

    describe('setMax', () => {
        it('updates max and recomputes percentage', () => {
            const ratio = createRatio()
            ratio.setCurrent(50)
            ratio.setMax(200)

            expect(ratio.max.value).toBe(200)
            expect(ratio.percentage.value).toBe(25)
        })

        it('clamps current when max is reduced below current', () => {
            const ratio = createRatio()
            ratio.setCurrent(80)
            ratio.setMax(50)

            expect(ratio.current.value).toBe(50)
            expect(ratio.isComplete.value).toBe(true)
        })
    })

    describe('reset', () => {
        it('resets current to 0', () => {
            const ratio = createRatio()
            ratio.setCurrent(75)
            ratio.reset()

            expect(ratio.current.value).toBe(0)
            expect(ratio.percentage.value).toBe(0)
            expect(ratio.isComplete.value).toBe(false)
        })
    })

    describe('edge cases', () => {
        it('handles max of 0 without division error', () => {
            const useRatio = defineRatio<[]>(() => ({ max: 0 }))
            const ratio = useRatio()

            expect(ratio.percentage.value).toBe(0)
            expect(ratio.ratio.value).toBe(0)
        })

        it('creates independent instances', () => {
            const useRatio = defineRatio<[]>(() => ({ max: 100 }))
            const a = useRatio()
            const b = useRatio()

            a.setCurrent(50)

            expect(a.current.value).toBe(50)
            expect(b.current.value).toBe(0)
        })

        it('clamps initial current to max', () => {
            const useRatio = defineRatio<[]>(() => ({ current: 200, max: 100 }))
            const ratio = useRatio()
            expect(ratio.current.value).toBe(100)
        })
    })
})

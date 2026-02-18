import { describe, it, expect } from 'vitest'
import { defineProgress } from '../defineProgress'

describe('defineProgress', () => {
    const createProgress = () => {
        const useProgress = defineProgress<[]>(() => ({
            max: 100,
            unit: 'percent',
            precision: 0,
        }))
        return useProgress()
    }

    describe('initial state', () => {
        it('starts with current at 0', () => {
            const progress = createProgress()
            expect(progress.current.value).toBe(0)
        })

        it('starts with configured max', () => {
            const progress = createProgress()
            expect(progress.max.value).toBe(100)
        })

        it('starts with percentage at 0', () => {
            const progress = createProgress()
            expect(progress.percentage.value).toBe(0)
        })

        it('starts not complete', () => {
            const progress = createProgress()
            expect(progress.isComplete.value).toBe(false)
        })
    })

    describe('setCurrent', () => {
        it('updates current and percentage', () => {
            const progress = createProgress()
            progress.setCurrent(45)

            expect(progress.current.value).toBe(45)
            expect(progress.percentage.value).toBe(45)
        })

        it('clamps current to max', () => {
            const progress = createProgress()
            progress.setCurrent(150)

            expect(progress.current.value).toBe(100)
        })

        it('clamps current to 0', () => {
            const progress = createProgress()
            progress.setCurrent(-10)

            expect(progress.current.value).toBe(0)
        })
    })

    describe('computed values', () => {
        it('computes ratio between 0 and 1', () => {
            const progress = createProgress()
            progress.setCurrent(50)

            expect(progress.ratio.value).toBe(0.5)
        })

        it('computes remaining', () => {
            const progress = createProgress()
            progress.setCurrent(30)

            expect(progress.remaining.value).toBe(70)
        })

        it('isComplete when current equals max', () => {
            const progress = createProgress()
            progress.setCurrent(100)

            expect(progress.isComplete.value).toBe(true)
        })

        it('isComplete when current exceeds max via clamp', () => {
            const progress = createProgress()
            progress.setCurrent(200)

            expect(progress.isComplete.value).toBe(true)
            expect(progress.current.value).toBe(100)
        })
    })

    describe('formatted output', () => {
        it('formats as percent', () => {
            const progress = createProgress()
            progress.setCurrent(45)

            expect(progress.formatted.value).toBe('45%')
        })

        it('formats as number when unit is number', () => {
            const useProgress = defineProgress<[]>(() => ({
                max: 200,
                unit: 'number',
            }))
            const progress = useProgress()
            progress.setCurrent(75)

            expect(progress.formatted.value).toBe('75 / 200')
        })
    })

    describe('precision', () => {
        it('rounds percentage to configured decimals', () => {
            const useProgress = defineProgress<[]>(() => ({
                max: 3,
                unit: 'percent',
                precision: 2,
            }))
            const progress = useProgress()
            progress.setCurrent(1)

            expect(progress.percentage.value).toBe(33.33)
        })

        it('rounds ratio to precision + 2 decimals', () => {
            const useProgress = defineProgress<[]>(() => ({
                max: 3,
                precision: 2,
            }))
            const progress = useProgress()
            progress.setCurrent(1)

            expect(progress.ratio.value).toBe(0.3333)
        })
    })

    describe('setMax', () => {
        it('updates max and recomputes percentage', () => {
            const progress = createProgress()
            progress.setCurrent(50)
            progress.setMax(200)

            expect(progress.max.value).toBe(200)
            expect(progress.percentage.value).toBe(25)
        })

        it('clamps current when max is reduced below current', () => {
            const progress = createProgress()
            progress.setCurrent(80)
            progress.setMax(50)

            expect(progress.current.value).toBe(50)
            expect(progress.isComplete.value).toBe(true)
        })
    })

    describe('reset', () => {
        it('resets current to 0', () => {
            const progress = createProgress()
            progress.setCurrent(75)
            progress.reset()

            expect(progress.current.value).toBe(0)
            expect(progress.percentage.value).toBe(0)
            expect(progress.isComplete.value).toBe(false)
        })
    })

    describe('edge cases', () => {
        it('handles max of 0 without division error', () => {
            const useProgress = defineProgress<[]>(() => ({
                max: 0,
            }))
            const progress = useProgress()

            expect(progress.percentage.value).toBe(0)
            expect(progress.ratio.value).toBe(0)
        })

        it('creates independent instances', () => {
            const useProgress = defineProgress<[]>(() => ({
                max: 100,
            }))
            const a = useProgress()
            const b = useProgress()

            a.setCurrent(50)

            expect(a.current.value).toBe(50)
            expect(b.current.value).toBe(0)
        })
    })
})

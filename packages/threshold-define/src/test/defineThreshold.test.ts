import { describe, it, expect } from 'vitest'
import { defineThreshold } from '../defineThreshold'

const defaultThresholds = [
    { min: 0, max: 25, color: '#F44336', textColor: '#fff', label: 'critical' },
    { min: 25, max: 50, color: '#FF9800', textColor: '#fff', label: 'warning' },
    { min: 50, max: 75, color: '#2196F3', textColor: '#fff', label: 'good' },
    { min: 75, max: 100, color: '#4CAF50', textColor: '#fff', label: 'excellent' },
]

const createThreshold = () => {
    const useThreshold = defineThreshold<[]>(() => ({
        thresholds: defaultThresholds,
        fallback: { color: '#9E9E9E', textColor: '#fff', label: 'unknown' },
    }))
    return useThreshold()
}

describe('defineThreshold', () => {
    describe('initial state', () => {
        it('starts with null value', () => {
            const threshold = createThreshold()
            expect(threshold.value.value).toBeNull()
        })

        it('starts with null match', () => {
            const threshold = createThreshold()
            expect(threshold.match.value).toBeNull()
        })

        it('starts with null color', () => {
            const threshold = createThreshold()
            expect(threshold.color.value).toBeNull()
        })
    })

    describe('setValue and matching', () => {
        it('matches critical threshold', () => {
            const threshold = createThreshold()
            threshold.setValue(10)

            expect(threshold.label.value).toBe('critical')
            expect(threshold.color.value).toBe('#F44336')
        })

        it('matches warning threshold', () => {
            const threshold = createThreshold()
            threshold.setValue(30)

            expect(threshold.label.value).toBe('warning')
            expect(threshold.color.value).toBe('#FF9800')
        })

        it('matches good threshold', () => {
            const threshold = createThreshold()
            threshold.setValue(60)

            expect(threshold.label.value).toBe('good')
            expect(threshold.color.value).toBe('#2196F3')
        })

        it('matches excellent threshold', () => {
            const threshold = createThreshold()
            threshold.setValue(80)

            expect(threshold.label.value).toBe('excellent')
            expect(threshold.color.value).toBe('#4CAF50')
        })
    })

    describe('boundary values', () => {
        it('matches threshold at exact min value', () => {
            const threshold = createThreshold()
            threshold.setValue(25)

            expect(threshold.label.value).toBe('warning')
        })

        it('matches first threshold at 0', () => {
            const threshold = createThreshold()
            threshold.setValue(0)

            expect(threshold.label.value).toBe('critical')
        })

        it('uses fallback at exact max of last threshold', () => {
            const threshold = createThreshold()
            threshold.setValue(100)

            expect(threshold.label.value).toBe('unknown')
        })
    })

    describe('textColor and style', () => {
        it('extracts textColor from match', () => {
            const threshold = createThreshold()
            threshold.setValue(10)

            expect(threshold.textColor.value).toBe('#fff')
        })

        it('computes style object', () => {
            const threshold = createThreshold()
            threshold.setValue(30)

            expect(threshold.style.value).toEqual({
                color: '#fff',
                backgroundColor: '#FF9800',
            })
        })

        it('returns null style when no match', () => {
            const threshold = createThreshold()
            expect(threshold.style.value).toBeNull()
        })
    })

    describe('fallback', () => {
        it('uses fallback when value does not match any threshold', () => {
            const threshold = createThreshold()
            threshold.setValue(150)

            expect(threshold.label.value).toBe('unknown')
            expect(threshold.color.value).toBe('#9E9E9E')
        })

        it('uses default fallback when none configured', () => {
            const useThreshold = defineThreshold<[]>(() => ({
                thresholds: [{ min: 0, max: 50, color: '#F00', label: 'low' }],
            }))
            const threshold = useThreshold()
            threshold.setValue(75)

            expect(threshold.label.value).toBe('unknown')
            expect(threshold.color.value).toBe('#9E9E9E')
        })
    })

    describe('reactivity', () => {
        it('updates match when value changes', () => {
            const threshold = createThreshold()
            threshold.setValue(10)
            expect(threshold.label.value).toBe('critical')

            threshold.setValue(80)
            expect(threshold.label.value).toBe('excellent')
        })
    })

    describe('reset', () => {
        it('resets value to null', () => {
            const threshold = createThreshold()
            threshold.setValue(50)
            threshold.reset()

            expect(threshold.value.value).toBeNull()
            expect(threshold.match.value).toBeNull()
            expect(threshold.color.value).toBeNull()
        })
    })

    describe('independent instances', () => {
        it('creates independent instances', () => {
            const useThreshold = defineThreshold<[]>(() => ({
                thresholds: defaultThresholds,
            }))
            const a = useThreshold()
            const b = useThreshold()

            a.setValue(10)

            expect(a.label.value).toBe('critical')
            expect(b.value.value).toBeNull()
        })
    })
})

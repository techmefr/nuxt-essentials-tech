import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from '../debounce'

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should debounce function calls with number delay', () => {
        const fn = vi.fn()
        const debouncedFn = debounce(fn, 500)

        debouncedFn('test1')
        debouncedFn('test2')
        debouncedFn('test3')

        expect(fn).not.toHaveBeenCalled()

        vi.advanceTimersByTime(500)

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('test3')
    })

    it('should debounce function calls with options object', () => {
        const fn = vi.fn()
        const debouncedFn = debounce(fn, { delay: 300 })

        debouncedFn('test')

        expect(fn).not.toHaveBeenCalled()

        vi.advanceTimersByTime(300)

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should support leading option', () => {
        const fn = vi.fn()
        const debouncedFn = debounce(fn, { delay: 500, leading: true, trailing: false })

        debouncedFn('test1')

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('test1')

        debouncedFn('test2')

        vi.advanceTimersByTime(500)

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should support trailing option', () => {
        const fn = vi.fn()
        const debouncedFn = debounce(fn, { delay: 500, leading: false, trailing: true })

        debouncedFn('test')

        expect(fn).not.toHaveBeenCalled()

        vi.advanceTimersByTime(500)

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should support both leading and trailing', () => {
        const fn = vi.fn()
        const debouncedFn = debounce(fn, { delay: 500, leading: true, trailing: true })

        debouncedFn('test1')

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('test1')

        debouncedFn('test2')

        vi.advanceTimersByTime(500)

        expect(fn).toHaveBeenCalledTimes(2)
        expect(fn).toHaveBeenLastCalledWith('test2')
    })

    it('should cancel pending calls', () => {
        const fn = vi.fn()
        const debouncedFn = debounce(fn, 500)

        debouncedFn('test')
        debouncedFn.cancel()

        vi.advanceTimersByTime(500)

        expect(fn).not.toHaveBeenCalled()
    })

    it('should handle multiple rapid calls', () => {
        const fn = vi.fn()
        const debouncedFn = debounce(fn, 300)

        debouncedFn('call1')
        vi.advanceTimersByTime(100)
        debouncedFn('call2')
        vi.advanceTimersByTime(100)
        debouncedFn('call3')
        vi.advanceTimersByTime(300)

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('call3')
    })
})

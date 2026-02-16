import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should debounce async function', async () => {
        const fn = vi.fn(async (value: string) => `result: ${value}`)
        const { execute, isPending } = useDebounce(fn, { delay: 500 })

        const promise = execute('test')

        expect(isPending.value).toBe(false)
        expect(fn).not.toHaveBeenCalled()

        await vi.advanceTimersByTimeAsync(500)
        const result = await promise

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('test')
        expect(result).toBe('result: test')
        expect(isPending.value).toBe(false)
    })

    it('should handle multiple calls', async () => {
        const fn = vi.fn(async (value: string) => value)
        const { execute } = useDebounce(fn, { delay: 300 })

        execute('call1')
        execute('call2')
        const promise = execute('call3')

        await vi.advanceTimersByTimeAsync(300)
        await promise

        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('call3')
    })

    it('should support leading option', async () => {
        const fn = vi.fn(async (value: string) => value)
        const { execute } = useDebounce(fn, { delay: 500, leading: true, trailing: false })

        const result = await execute('test')

        expect(fn).toHaveBeenCalledTimes(1)
        expect(result).toBe('test')

        await vi.advanceTimersByTimeAsync(500)

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should cancel pending execution', async () => {
        const fn = vi.fn(async (value: string) => value)
        const { execute, cancel, isPending } = useDebounce(fn, { delay: 500 })

        execute('test')
        cancel()

        await vi.advanceTimersByTimeAsync(500)

        expect(fn).not.toHaveBeenCalled()
        expect(isPending.value).toBe(false)
    })

    it('should set isPending during execution', async () => {
        const fn = vi.fn(async (value: string) => {
            await new Promise(resolve => setTimeout(resolve, 100))
            return value
        })
        const { execute, isPending } = useDebounce(fn, { delay: 300 })

        const promise = execute('test')

        expect(isPending.value).toBe(false)

        await vi.advanceTimersByTimeAsync(300)

        expect(isPending.value).toBe(true)

        await vi.advanceTimersByTimeAsync(100)
        await promise

        expect(isPending.value).toBe(false)
    })
})

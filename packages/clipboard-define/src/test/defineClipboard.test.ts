import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineClipboard } from '../defineClipboard'

const mockWriteText = vi.fn().mockResolvedValue(undefined)
const mockWindowOpen = vi.fn()

beforeEach(() => {
    vi.useFakeTimers()
    mockWriteText.mockClear().mockResolvedValue(undefined)
    mockWindowOpen.mockClear()

    Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
        configurable: true,
    })
    vi.stubGlobal('open', mockWindowOpen)
})

const createClipboard = (resetDelay?: number) => {
    const useClipboard = defineClipboard<[]>(() => ({
        resetDelay,
    }))
    return useClipboard()
}

describe('defineClipboard', () => {
    describe('initial state', () => {
        it('starts with isCopied false', () => {
            const clipboard = createClipboard()
            expect(clipboard.isCopied.value).toBe(false)
        })

        it('starts with lastValue null', () => {
            const clipboard = createClipboard()
            expect(clipboard.lastValue.value).toBeNull()
        })

        it('starts with lastType null', () => {
            const clipboard = createClipboard()
            expect(clipboard.lastType.value).toBeNull()
        })
    })

    describe('copy', () => {
        it('sets isCopied to true after copy', async () => {
            const clipboard = createClipboard()
            await clipboard.copy('Hello')

            expect(clipboard.isCopied.value).toBe(true)
        })

        it('sets lastValue to copied text', async () => {
            const clipboard = createClipboard()
            await clipboard.copy('Hello world')

            expect(clipboard.lastValue.value).toBe('Hello world')
        })

        it('sets lastType to text', async () => {
            const clipboard = createClipboard()
            await clipboard.copy('Hello')

            expect(clipboard.lastType.value).toBe('text')
        })

        it('calls navigator.clipboard.writeText', async () => {
            const clipboard = createClipboard()
            await clipboard.copy('Hello')

            expect(mockWriteText).toHaveBeenCalledWith('Hello')
        })

        it('returns false when writeText fails', async () => {
            mockWriteText.mockRejectedValueOnce(new Error('denied'))
            const clipboard = createClipboard()

            const result = await clipboard.copy('Hello')

            expect(result).toBe(false)
            expect(clipboard.isCopied.value).toBe(false)
        })
    })

    describe('tel', () => {
        it('sets lastType to tel', async () => {
            const clipboard = createClipboard()
            await clipboard.tel('+33 6 12 34 56 78')

            expect(clipboard.lastType.value).toBe('tel')
        })

        it('calls writeText with the number', async () => {
            const clipboard = createClipboard()
            await clipboard.tel('+33 6 12 34 56 78')

            expect(mockWriteText).toHaveBeenCalledWith('+33 6 12 34 56 78')
        })

        it('opens tel: link with spaces removed', async () => {
            const clipboard = createClipboard()
            await clipboard.tel('+33 6 12 34 56 78')

            expect(mockWindowOpen).toHaveBeenCalledWith('tel:+33612345678')
        })
    })

    describe('mail', () => {
        it('sets lastType to mail', async () => {
            const clipboard = createClipboard()
            await clipboard.mail('contact@example.com')

            expect(clipboard.lastType.value).toBe('mail')
        })

        it('calls writeText with the email', async () => {
            const clipboard = createClipboard()
            await clipboard.mail('contact@example.com')

            expect(mockWriteText).toHaveBeenCalledWith('contact@example.com')
        })

        it('opens mailto: link', async () => {
            const clipboard = createClipboard()
            await clipboard.mail('contact@example.com')

            expect(mockWindowOpen).toHaveBeenCalledWith('mailto:contact@example.com')
        })
    })

    describe('resetDelay', () => {
        it('resets isCopied after default delay', async () => {
            const clipboard = createClipboard()
            await clipboard.copy('Hello')

            expect(clipboard.isCopied.value).toBe(true)
            vi.advanceTimersByTime(2000)
            expect(clipboard.isCopied.value).toBe(false)
        })

        it('respects custom resetDelay', async () => {
            const clipboard = createClipboard(500)
            await clipboard.copy('Hello')

            vi.advanceTimersByTime(499)
            expect(clipboard.isCopied.value).toBe(true)
            vi.advanceTimersByTime(1)
            expect(clipboard.isCopied.value).toBe(false)
        })
    })

    describe('reset', () => {
        it('resets all state to initial values', async () => {
            const clipboard = createClipboard()
            await clipboard.copy('Hello')
            clipboard.reset()

            expect(clipboard.isCopied.value).toBe(false)
            expect(clipboard.lastValue.value).toBeNull()
            expect(clipboard.lastType.value).toBeNull()
        })
    })

    describe('independent instances', () => {
        it('creates independent instances', async () => {
            const useClipboard = defineClipboard<[]>(() => ({}))
            const a = useClipboard()
            const b = useClipboard()

            await a.copy('Hello')

            expect(a.isCopied.value).toBe(true)
            expect(b.isCopied.value).toBe(false)
        })
    })
})

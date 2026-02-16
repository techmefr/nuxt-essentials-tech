import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { useBeforeUnload } from '../useBeforeUnload'

describe('useBeforeUnload', () => {
    let addEventListenerSpy: ReturnType<typeof vi.fn>
    let removeEventListenerSpy: ReturnType<typeof vi.fn>
    let confirmSpy: ReturnType<typeof vi.fn>

    beforeEach(() => {
        addEventListenerSpy = vi.fn()
        removeEventListenerSpy = vi.fn()
        confirmSpy = vi.fn(() => true)

        global.window = {
            addEventListener: addEventListenerSpy,
            removeEventListener: removeEventListenerSpy,
            confirm: confirmSpy,
        } as unknown as Window & typeof globalThis

        global.document = {
            querySelectorAll: vi.fn(() => []),
        } as unknown as Document
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should initialize with isActive true', () => {
        const isDirty = ref(false)
        const { isActive } = useBeforeUnload({
            watch: () => isDirty.value,
        })

        expect(isActive.value).toBe(true)
    })

    it('should add beforeunload listener on mount', () => {
        const isDirty = ref(false)
        useBeforeUnload({
            watch: () => isDirty.value,
        })

        expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))
    })

    it('should enable and disable guard', () => {
        const isDirty = ref(false)
        const { enable, disable, isActive } = useBeforeUnload({
            watch: () => isDirty.value,
        })

        expect(isActive.value).toBe(true)

        disable()
        expect(isActive.value).toBe(false)

        enable()
        expect(isActive.value).toBe(true)
    })

    it('should use custom message', () => {
        const isDirty = ref(true)
        const customMessage = 'Custom warning message'

        useBeforeUnload({
            watch: () => isDirty.value,
            message: customMessage,
        })

        const [[, handler]] = addEventListenerSpy.mock.calls
        const event = { preventDefault: vi.fn(), returnValue: '' } as unknown as BeforeUnloadEvent

        handler(event)

        expect(event.returnValue).toBe(customMessage)
    })

    it('should not warn when watch returns false', () => {
        const isDirty = ref(false)

        useBeforeUnload({
            watch: () => isDirty.value,
        })

        const [[, handler]] = addEventListenerSpy.mock.calls
        const event = { preventDefault: vi.fn(), returnValue: '' } as unknown as BeforeUnloadEvent

        const result = handler(event)

        expect(result).toBeUndefined()
        expect(event.preventDefault).not.toHaveBeenCalled()
    })

    it('should warn when watch returns true', () => {
        const isDirty = ref(true)

        useBeforeUnload({
            watch: () => isDirty.value,
        })

        const [[, handler]] = addEventListenerSpy.mock.calls
        const event = { preventDefault: vi.fn(), returnValue: '' } as unknown as BeforeUnloadEvent

        handler(event)

        expect(event.preventDefault).toHaveBeenCalled()
        expect(event.returnValue).toBe('You have unsaved changes. Are you sure you want to leave?')
    })

    it('should handle computed ref from watch', () => {
        const isDirty = ref(true)

        useBeforeUnload({
            watch: () => isDirty,
        })

        const [[, handler]] = addEventListenerSpy.mock.calls
        const event = { preventDefault: vi.fn(), returnValue: '' } as unknown as BeforeUnloadEvent

        handler(event)

        expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should not warn when disabled', () => {
        const isDirty = ref(true)
        const { disable } = useBeforeUnload({
            watch: () => isDirty.value,
        })

        disable()

        const [[, handler]] = addEventListenerSpy.mock.calls
        const event = { preventDefault: vi.fn(), returnValue: '' } as unknown as BeforeUnloadEvent

        const result = handler(event)

        expect(result).toBeUndefined()
        expect(event.preventDefault).not.toHaveBeenCalled()
    })
})

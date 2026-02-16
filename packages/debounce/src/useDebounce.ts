import { ref, onUnmounted, getCurrentInstance } from 'vue'
import type { IDebounceOptions, IUseDebounceReturn } from './types'

export const useDebounce = <TArgs extends unknown[], TReturn>(
    fn: (...args: TArgs) => Promise<TReturn> | TReturn,
    options: IDebounceOptions = {}
): IUseDebounceReturn<TArgs, TReturn> => {
    const delay = options.delay ?? 500
    const leading = options.leading ?? false
    const trailing = options.trailing ?? true

    const isPending = ref(false)
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastCallTime = 0

    const cancel = (): void => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        isPending.value = false
    }

    const execute = async (...args: TArgs): Promise<TReturn | undefined> => {
        const now = Date.now()
        const timeSinceLastCall = now - lastCallTime

        const callFunction = async (): Promise<TReturn> => {
            lastCallTime = Date.now()
            isPending.value = true
            try {
                return await fn(...args)
            } finally {
                isPending.value = false
            }
        }

        if (leading && timeSinceLastCall >= delay) {
            cancel()
            return await callFunction()
        }

        if (trailing) {
            cancel()
            return new Promise((resolve) => {
                timeoutId = setTimeout(async () => {
                    const result = await callFunction()
                    timeoutId = null
                    resolve(result)
                }, delay)
            })
        }

        return undefined
    }

    if (getCurrentInstance()) {
        onUnmounted(() => {
            cancel()
        })
    }

    return {
        execute,
        cancel,
        isPending,
    }
}

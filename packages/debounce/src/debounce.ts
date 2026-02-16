import type { IDebounceOptions, IDebouncedFunction } from './types'

export const debounce = <TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    delayOrOptions: number | IDebounceOptions
): IDebouncedFunction<TArgs> => {
    const options: IDebounceOptions = typeof delayOrOptions === 'number'
        ? { delay: delayOrOptions, leading: false, trailing: true }
        : { delay: 300, leading: false, trailing: true, ...delayOrOptions }

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastCallTime = 0

    const debouncedFn = (...args: TArgs): void => {
        const now = Date.now()
        const timeSinceLastCall = now - lastCallTime

        const clearTimer = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }
        }

        const callFunction = () => {
            lastCallTime = Date.now()
            fn(...args)
        }

        if (options.leading && timeSinceLastCall >= (options.delay ?? 300)) {
            clearTimer()
            callFunction()
        }

        if (options.trailing) {
            clearTimer()
            timeoutId = setTimeout(() => {
                callFunction()
                timeoutId = null
            }, options.delay ?? 300)
        }
    }

    debouncedFn.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    return debouncedFn
}

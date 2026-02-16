export interface IDebounceOptions {
    delay?: number
    leading?: boolean
    trailing?: boolean
}

export interface IDebouncedFunction<TArgs extends unknown[]> {
    (...args: TArgs): void
    cancel: () => void
}

export interface IUseDebounceReturn<TArgs extends unknown[], TReturn> {
    execute: (...args: TArgs) => Promise<TReturn | undefined>
    cancel: () => void
    isPending: import('vue').Ref<boolean>
}

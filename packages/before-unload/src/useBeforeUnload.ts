import { ref, watch as vueWatch, onUnmounted, unref, computed, getCurrentInstance } from 'vue'
import type { IBeforeUnloadConfig, IBeforeUnloadReturn } from './types'

export const useBeforeUnload = (config: IBeforeUnloadConfig): IBeforeUnloadReturn => {
    const defaultMessage = 'You have unsaved changes. Are you sure you want to leave?'
    const message = config.message ?? defaultMessage
    const enableRouteGuard = config.onRouteChange ?? true
    const enableModalGuard = config.onModalClose ?? false
    const autoDisable = config.autoDisableOnSubmit ?? true

    const isActive = ref(false)
    const isEnabled = ref(true)
    let removeRouterGuard: (() => void) | null = null

    const shouldWarn = computed(() => {
        const watchValue = config.watch()
        return unref(watchValue)
    })

    const handleBeforeUnload = (event: BeforeUnloadEvent): string | undefined => {
        if (!isEnabled.value || !shouldWarn.value) {
            return undefined
        }

        event.preventDefault()
        event.returnValue = message
        return message
    }

    const setupRouterGuard = (): void => {
        if (!enableRouteGuard) {
            return
        }

        try {
            const router = (window as unknown as { $router?: { beforeEach: (guard: (to: unknown, from: unknown, next: (arg?: boolean) => void) => void) => () => void } }).$router

            if (!router) {
                return
            }

            removeRouterGuard = router.beforeEach((_to, _from, next) => {
                if (!isEnabled.value || !shouldWarn.value) {
                    next()
                    return
                }

                const confirmed = window.confirm(message)
                next(confirmed)
            })
        } catch {
            return
        }
    }

    const enable = (): void => {
        isEnabled.value = true
        isActive.value = true
    }

    const disable = (): void => {
        isEnabled.value = false
        isActive.value = false
    }

    const setup = (): void => {
        window.addEventListener('beforeunload', handleBeforeUnload)
        setupRouterGuard()
        isActive.value = true

        if (autoDisable) {
            const forms = document.querySelectorAll('form')
            forms.forEach(form => {
                form.addEventListener('submit', disable)
            })
        }
    }

    const cleanup = (): void => {
        window.removeEventListener('beforeunload', handleBeforeUnload)

        if (removeRouterGuard) {
            removeRouterGuard()
        }

        if (autoDisable) {
            const forms = document.querySelectorAll('form')
            forms.forEach(form => {
                form.removeEventListener('submit', disable)
            })
        }
    }

    setup()

    if (getCurrentInstance()) {
        onUnmounted(cleanup)
    }

    if (enableModalGuard) {
        vueWatch(shouldWarn, (newValue) => {
            if (newValue) {
                isActive.value = true
            }
        })
    }

    return {
        enable,
        disable,
        isActive,
    }
}

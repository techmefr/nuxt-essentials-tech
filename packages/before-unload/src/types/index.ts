import type { Ref } from 'vue'

export interface IBeforeUnloadConfig {
    watch: () => boolean | Ref<boolean>
    message?: string
    onRouteChange?: boolean
    onModalClose?: boolean
    autoDisableOnSubmit?: boolean
}

export interface IBeforeUnloadReturn {
    enable: () => void
    disable: () => void
    isActive: Ref<boolean>
}

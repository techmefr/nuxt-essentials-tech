import type { Ref } from 'vue'

export type ClipboardType = 'text' | 'tel' | 'mail'

export interface IClipboardConfig {
    resetDelay?: number
}

export interface IClipboardReturn {
    isCopied: Ref<boolean>
    lastValue: Ref<string | null>
    lastType: Ref<ClipboardType | null>
    copy(text: string): Promise<boolean>
    tel(number: string): Promise<boolean>
    mail(email: string): Promise<boolean>
    reset(): void
}

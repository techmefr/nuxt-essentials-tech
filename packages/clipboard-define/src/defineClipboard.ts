import { ref } from 'vue'
import type { IClipboardConfig, IClipboardReturn, ClipboardType } from './types'

const DEFAULT_RESET_DELAY = 2000

export const defineClipboard = <TArgs extends unknown[]>(
    callback: (...args: TArgs) => IClipboardConfig
) => {
    return (...args: TArgs): IClipboardReturn => {
        const config = callback(...args)
        const resetDelay = config.resetDelay ?? DEFAULT_RESET_DELAY

        const isCopied = ref(false)
        const lastValue = ref<string | null>(null)
        const lastType = ref<ClipboardType | null>(null)

        let resetTimer: ReturnType<typeof setTimeout> | null = null

        const copyToClipboard = async (text: string): Promise<boolean> => {
            try {
                await navigator.clipboard.writeText(text)
                return true
            } catch {
                return false
            }
        }

        const handleCopy = async (text: string, type: ClipboardType): Promise<boolean> => {
            const success = await copyToClipboard(text)
            if (!success) return false

            isCopied.value = true
            lastValue.value = text
            lastType.value = type

            if (resetTimer !== null) clearTimeout(resetTimer)
            resetTimer = setTimeout(() => {
                isCopied.value = false
            }, resetDelay)

            return true
        }

        const copy = (text: string): Promise<boolean> => handleCopy(text, 'text')

        const tel = async (number: string): Promise<boolean> => {
            const success = await handleCopy(number, 'tel')
            if (success) window.open('tel:' + number.replace(/\s/g, ''))
            return success
        }

        const mail = async (email: string): Promise<boolean> => {
            const success = await handleCopy(email, 'mail')
            if (success) window.open('mailto:' + email)
            return success
        }

        const reset = (): void => {
            if (resetTimer !== null) clearTimeout(resetTimer)
            isCopied.value = false
            lastValue.value = null
            lastType.value = null
        }

        return { isCopied, lastValue, lastType, copy, tel, mail, reset }
    }
}

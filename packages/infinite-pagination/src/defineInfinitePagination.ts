import { ref, type Ref } from 'vue'
import type { IInfinitePaginationConfig, IInfinitePaginationReturn } from './types'

export const defineInfinitePagination = <TArgs extends unknown[], T>(
    callback: (...args: TArgs) => IInfinitePaginationConfig<T>
) => {
    return (...args: TArgs): IInfinitePaginationReturn<T> => {
        const config = callback(...args)
        const initialPage = config.initialPage ?? 1

        const items = ref<T[]>([]) as Ref<T[]>
        const total = ref<number | undefined>(undefined)
        const currentPage = ref(initialPage)
        const hasMore = ref(true)
        const isLoading = ref(false)

        const loadMore = async (): Promise<void> => {
            if (isLoading.value || !hasMore.value) {
                return
            }

            isLoading.value = true

            try {
                const result = await config.load(currentPage.value)

                items.value = [...items.value, ...result.items]
                hasMore.value = result.hasMore

                if (result.total !== undefined) {
                    total.value = result.total
                }

                if (result.hasMore) {
                    currentPage.value += 1
                }
            } catch (error) {
                config.onError?.(error as Error)
                throw error
            } finally {
                isLoading.value = false
            }
        }

        const reset = (): void => {
            items.value = []
            total.value = undefined
            currentPage.value = initialPage
            hasMore.value = true
            isLoading.value = false
        }

        const refresh = async (): Promise<void> => {
            reset()
            await loadMore()
        }

        return {
            items,
            total,
            currentPage,
            hasMore,
            isLoading,
            loadMore,
            reset,
            refresh,
        }
    }
}

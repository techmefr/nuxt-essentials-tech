import { ref, watch, type Ref } from 'vue'
import type { ITableSort, ITableBody, ITableConfig, ITableReturn } from './types'

export const defineTable = <TArgs extends unknown[], T>(
    callback: (...args: TArgs) => ITableConfig<T>
) => {
    return (...args: TArgs): ITableReturn<T> => {
        const config = callback(...args)
        const enableWatch = config.watch !== false
        const debounceDelay = config.debounceMs ?? 500
        const minSearchLength = config.minSearchLength ?? 2

        const items = ref<T[]>([]) as Ref<T[]>
        const total = ref(0)
        const isLoading = ref(false)

        const page = ref(1)
        const itemsPerPage = ref(config.itemsPerPage ?? 10)
        const sorts = ref<ITableSort[]>([]) as Ref<ITableSort[]>
        const search = ref('')
        const filters = ref<Record<string, unknown>>({})

        let debounceTimer: ReturnType<typeof setTimeout> | null = null

        const refresh = async (): Promise<void> => {
            isLoading.value = true
            try {
                const body: ITableBody = {
                    page: page.value,
                    itemsPerPage: itemsPerPage.value,
                    sorts: sorts.value,
                    search: search.value,
                    filters: filters.value,
                }
                const result = await config.load(body)
                items.value = result.items
                total.value = result.total
            } catch (error) {
                config.onError?.(error as Error)
                throw error
            } finally {
                isLoading.value = false
            }
        }

        const reset = (): void => {
            items.value = []
            total.value = 0
            page.value = 1
            itemsPerPage.value = config.itemsPerPage ?? 10
            sorts.value = []
            search.value = ''
            filters.value = {}
        }

        if (enableWatch) {
            watch([page, itemsPerPage, sorts], () => {
                refresh()
            }, { deep: true })

            watch([search, filters], () => {
                if (debounceTimer) {
                    clearTimeout(debounceTimer)
                }

                if (search.value.length > 0 && search.value.length < minSearchLength) {
                    return
                }

                debounceTimer = setTimeout(() => {
                    page.value = 1
                    refresh()
                }, debounceDelay)
            }, { deep: true })
        }

        return {
            items,
            total,
            isLoading,
            page,
            itemsPerPage,
            sorts,
            search,
            filters,
            refresh,
            reset,
        }
    }
}

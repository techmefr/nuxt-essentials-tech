import type { Ref } from 'vue'

export interface ITableSort {
    key: string
    order: 'asc' | 'desc'
}

export interface ITableBody {
    page: number
    itemsPerPage: number
    sorts: ITableSort[]
    search: string
    filters: Record<string, unknown>
}

export interface ITableConfig<T> {
    load: (body: ITableBody) => Promise<{ items: T[]; total: number }>
    itemsPerPage?: number
    watch?: boolean
    debounceMs?: number
    minSearchLength?: number
    onError?: (error: Error) => void
}

export interface ITableReturn<T> {
    items: Ref<T[]>
    total: Ref<number>
    isLoading: Ref<boolean>
    page: Ref<number>
    itemsPerPage: Ref<number>
    sorts: Ref<ITableSort[]>
    search: Ref<string>
    filters: Ref<Record<string, unknown>>
    refresh: () => Promise<void>
    reset: () => void
}

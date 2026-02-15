import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { defineTable } from '../defineTable'

interface IUser {
    id: number
    name: string
    email: string
}

const mockUsers: IUser[] = [
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' },
    { id: 3, name: 'Charlie', email: 'charlie@test.com' },
]

describe('defineTable', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('creation', () => {
        it('should create table with default values', () => {
            const useUsers = defineTable<[], IUser>(() => ({
                load: async () => ({ items: [], total: 0 }),
                watch: false,
            }))

            const table = useUsers()

            expect(table.items.value).toEqual([])
            expect(table.page.value).toBe(1)
            expect(table.itemsPerPage.value).toBe(10)
            expect(table.sorts.value).toEqual([])
            expect(table.search.value).toBe('')
            expect(table.filters.value).toEqual({})
            expect(table.total.value).toBe(0)
            expect(table.isLoading.value).toBe(false)
        })

        it('should create table with custom itemsPerPage', () => {
            const useUsers = defineTable<[], IUser>(() => ({
                load: async () => ({ items: [], total: 0 }),
                itemsPerPage: 25,
                watch: false,
            }))

            const table = useUsers()

            expect(table.itemsPerPage.value).toBe(25)
        })

        it('should pass arguments to config', () => {
            const useUsers = defineTable<[string], IUser>(status => ({
                load: async () => ({
                    items: status === 'active' ? mockUsers : [],
                    total: status === 'active' ? 3 : 0,
                }),
                watch: false,
            }))

            const table = useUsers('active')

            expect(table.items.value).toEqual([])
        })
    })

    describe('refresh', () => {
        it('should call load and update items and total', async () => {
            const mockLoad = vi.fn(async () => ({
                items: mockUsers,
                total: 100,
            }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: false,
            }))

            const table = useUsers()
            await table.refresh()

            expect(mockLoad).toHaveBeenCalled()
            expect(table.items.value).toEqual(mockUsers)
            expect(table.total.value).toBe(100)
        })

        it('should set isLoading to true during refresh', async () => {
            const useUsers = defineTable<[], IUser>(() => ({
                load: () =>
                    new Promise(resolve =>
                        setTimeout(() => resolve({ items: mockUsers, total: 3 }), 100)
                    ),
                watch: false,
            }))

            const table = useUsers()
            const promise = table.refresh()

            expect(table.isLoading.value).toBe(true)

            vi.advanceTimersByTime(100)
            await promise

            expect(table.isLoading.value).toBe(false)
        })

        it('should pass refs to load', async () => {
            const mockLoad = vi.fn(async () => ({ items: [], total: 0 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: false,
            }))

            const table = useUsers()
            table.page.value = 2
            table.search.value = 'test'
            table.sorts.value = [{ key: 'name', order: 'asc' }]
            table.filters.value = { status: 'active' }

            await table.refresh()

            expect(mockLoad).toHaveBeenCalledWith({
                page: 2,
                itemsPerPage: 10,
                search: 'test',
                sorts: [{ key: 'name', order: 'asc' }],
                filters: { status: 'active' },
            })
        })

        it('should handle errors with onError callback', async () => {
            const error = new Error('Load failed')
            const mockLoad = vi.fn(async () => {
                throw error
            })
            const onError = vi.fn()

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                onError,
                watch: false,
            }))

            const table = useUsers()

            await expect(table.refresh()).rejects.toThrow('Load failed')
            expect(onError).toHaveBeenCalledWith(error)
            expect(table.isLoading.value).toBe(false)
        })

        it('should handle errors without onError callback', async () => {
            const mockLoad = vi.fn(async () => {
                throw new Error('Load failed')
            })

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: false,
            }))

            const table = useUsers()

            await expect(table.refresh()).rejects.toThrow('Load failed')
            expect(table.isLoading.value).toBe(false)
        })
    })

    describe('auto watch', () => {
        it('should auto refresh when page changes', async () => {
            const mockLoad = vi.fn(async () => ({ items: mockUsers, total: 100 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: true,
            }))

            const table = useUsers()
            mockLoad.mockClear()

            table.page.value = 2
            await nextTick()

            expect(mockLoad).toHaveBeenCalledTimes(1)
        })

        it('should auto refresh when sorts change', async () => {
            const mockLoad = vi.fn(async () => ({ items: mockUsers, total: 100 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: true,
            }))

            const table = useUsers()
            mockLoad.mockClear()

            table.sorts.value = [{ key: 'name', order: 'desc' }]
            await nextTick()

            expect(mockLoad).toHaveBeenCalledTimes(1)
        })

        it('should debounce refresh when search changes', async () => {
            const mockLoad = vi.fn(async () => ({ items: mockUsers, total: 100 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: true,
            }))

            const table = useUsers()
            mockLoad.mockClear()

            table.search.value = 'test'
            await nextTick()

            expect(mockLoad).not.toHaveBeenCalled()

            vi.advanceTimersByTime(500)
            await nextTick()

            expect(mockLoad).toHaveBeenCalledTimes(1)
            expect(table.page.value).toBe(1)
        })

        it('should debounce refresh when filters change', async () => {
            const mockLoad = vi.fn(async () => ({ items: mockUsers, total: 100 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: true,
            }))

            const table = useUsers()
            await vi.advanceTimersByTimeAsync(0)
            mockLoad.mockClear()

            table.filters.value = { status: 'active' }
            await nextTick()

            expect(mockLoad).not.toHaveBeenCalled()

            await vi.advanceTimersByTimeAsync(500)

            expect(mockLoad).toHaveBeenCalledTimes(1)
            expect(table.page.value).toBe(1)
        })

        it('should use custom debounceMs', async () => {
            const mockLoad = vi.fn(async () => ({ items: mockUsers, total: 100 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: true,
                debounceMs: 300,
            }))

            const table = useUsers()
            mockLoad.mockClear()

            table.search.value = 'test'
            await nextTick()

            expect(mockLoad).not.toHaveBeenCalled()

            vi.advanceTimersByTime(300)
            await nextTick()

            expect(mockLoad).toHaveBeenCalledTimes(1)
        })

        it('should respect minSearchLength', async () => {
            const mockLoad = vi.fn(async () => ({ items: mockUsers, total: 100 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: true,
                minSearchLength: 3,
            }))

            const table = useUsers()
            mockLoad.mockClear()

            table.search.value = 'ab'
            await nextTick()
            vi.advanceTimersByTime(500)
            await nextTick()

            expect(mockLoad).not.toHaveBeenCalled()

            table.search.value = 'abc'
            await nextTick()
            vi.advanceTimersByTime(500)
            await nextTick()

            expect(mockLoad).toHaveBeenCalledTimes(1)
        })

        it('should not watch if watch is false', async () => {
            const mockLoad = vi.fn(async () => ({ items: mockUsers, total: 100 }))

            const useUsers = defineTable<[], IUser>(() => ({
                load: mockLoad,
                watch: false,
            }))

            const table = useUsers()
            mockLoad.mockClear()

            table.page.value = 2
            await nextTick()

            expect(mockLoad).not.toHaveBeenCalled()
        })
    })

    describe('reset', () => {
        it('should reset all values', async () => {
            const useUsers = defineTable<[], IUser>(() => ({
                load: async () => ({ items: mockUsers, total: 100 }),
                itemsPerPage: 20,
                watch: false,
            }))

            const table = useUsers()
            await table.refresh()

            table.page.value = 3
            table.search.value = 'test'

            table.reset()

            expect(table.items.value).toEqual([])
            expect(table.total.value).toBe(0)
            expect(table.page.value).toBe(1)
            expect(table.itemsPerPage.value).toBe(20)
            expect(table.search.value).toBe('')
        })
    })
})

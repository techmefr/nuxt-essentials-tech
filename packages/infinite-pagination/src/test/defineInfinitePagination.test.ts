import { describe, it, expect, vi } from 'vitest'
import { defineInfinitePagination } from '../defineInfinitePagination'

interface IUser {
    id: number
    name: string
}

const createMockUsers = (page: number, pageSize: number): IUser[] => {
    return Array.from({ length: pageSize }, (_, i) => ({
        id: (page - 1) * pageSize + i + 1,
        name: `User ${(page - 1) * pageSize + i + 1}`,
    }))
}

describe('defineInfinitePagination', () => {
    describe('initialization', () => {
        it('should initialize with default values', () => {
            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: async () => ({ items: [], hasMore: false }),
            }))

            const pagination = useUsers()

            expect(pagination.items.value).toEqual([])
            expect(pagination.total.value).toBeUndefined()
            expect(pagination.currentPage.value).toBe(1)
            expect(pagination.hasMore.value).toBe(true)
            expect(pagination.isLoading.value).toBe(false)
        })

        it('should initialize with custom pageSize and initialPage', () => {
            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: async () => ({ items: [], hasMore: false }),
                pageSize: 50,
                initialPage: 2,
            }))

            const pagination = useUsers()

            expect(pagination.currentPage.value).toBe(2)
        })

        it('should pass arguments to config callback', () => {
            const useUsers = defineInfinitePagination<[string], IUser>(status => ({
                load: async () => ({
                    items: status === 'active' ? [{ id: 1, name: 'Active User' }] : [],
                    hasMore: false,
                }),
            }))

            const pagination = useUsers('active')

            expect(pagination.items.value).toEqual([])
        })
    })

    describe('loadMore', () => {
        it('should load first page', async () => {
            const mockLoad = vi.fn(async (page: number) => ({
                items: createMockUsers(page, 20),
                hasMore: true,
                total: 100,
            }))

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()
            await pagination.loadMore()

            expect(mockLoad).toHaveBeenCalledWith(1)
            expect(pagination.items.value).toHaveLength(20)
            expect(pagination.currentPage.value).toBe(2)
            expect(pagination.hasMore.value).toBe(true)
            expect(pagination.total.value).toBe(100)
        })

        it('should append items on subsequent loads', async () => {
            const mockLoad = vi.fn(async (page: number) => ({
                items: createMockUsers(page, 20),
                hasMore: page < 3,
                total: 50,
            }))

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()

            await pagination.loadMore()
            expect(pagination.items.value).toHaveLength(20)

            await pagination.loadMore()
            expect(pagination.items.value).toHaveLength(40)
            expect(pagination.currentPage.value).toBe(3)

            await pagination.loadMore()
            expect(pagination.items.value).toHaveLength(60)
            expect(pagination.hasMore.value).toBe(false)
        })

        it('should set isLoading during load', async () => {
            const mockLoad = vi.fn(async () => {
                await new Promise(resolve => setTimeout(resolve, 100))
                return { items: [], hasMore: false }
            })

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()
            const promise = pagination.loadMore()

            expect(pagination.isLoading.value).toBe(true)

            await promise

            expect(pagination.isLoading.value).toBe(false)
        })

        it('should not load if already loading', async () => {
            const mockLoad = vi.fn(async () => {
                await new Promise(resolve => setTimeout(resolve, 100))
                return { items: createMockUsers(1, 20), hasMore: true }
            })

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()

            const promise1 = pagination.loadMore()
            const promise2 = pagination.loadMore()

            await Promise.all([promise1, promise2])

            expect(mockLoad).toHaveBeenCalledTimes(1)
        })

        it('should not load if hasMore is false', async () => {
            const mockLoad = vi.fn(async () => ({
                items: createMockUsers(1, 20),
                hasMore: false,
            }))

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()

            await pagination.loadMore()
            expect(mockLoad).toHaveBeenCalledTimes(1)

            await pagination.loadMore()
            expect(mockLoad).toHaveBeenCalledTimes(1)
        })

        it('should handle errors with onError callback', async () => {
            const error = new Error('Load failed')
            const mockLoad = vi.fn(async () => {
                throw error
            })
            const onError = vi.fn()

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
                onError,
            }))

            const pagination = useUsers()

            await expect(pagination.loadMore()).rejects.toThrow('Load failed')
            expect(onError).toHaveBeenCalledWith(error)
            expect(pagination.isLoading.value).toBe(false)
        })

        it('should handle errors without onError callback', async () => {
            const mockLoad = vi.fn(async () => {
                throw new Error('Load failed')
            })

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()

            await expect(pagination.loadMore()).rejects.toThrow('Load failed')
            expect(pagination.isLoading.value).toBe(false)
        })
    })

    describe('reset', () => {
        it('should reset all values to initial state', async () => {
            const mockLoad = vi.fn(async (page: number) => ({
                items: createMockUsers(page, 20),
                hasMore: true,
                total: 100,
            }))

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()

            await pagination.loadMore()
            await pagination.loadMore()

            expect(pagination.items.value).toHaveLength(40)

            pagination.reset()

            expect(pagination.items.value).toEqual([])
            expect(pagination.total.value).toBeUndefined()
            expect(pagination.currentPage.value).toBe(1)
            expect(pagination.hasMore.value).toBe(true)
            expect(pagination.isLoading.value).toBe(false)
        })
    })

    describe('refresh', () => {
        it('should reset and reload first page', async () => {
            const mockLoad = vi.fn(async (page: number) => ({
                items: createMockUsers(page, 20),
                hasMore: true,
                total: 100,
            }))

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()

            await pagination.loadMore()
            await pagination.loadMore()

            expect(pagination.items.value).toHaveLength(40)
            mockLoad.mockClear()

            await pagination.refresh()

            expect(mockLoad).toHaveBeenCalledWith(1)
            expect(pagination.items.value).toHaveLength(20)
            expect(pagination.currentPage.value).toBe(2)
        })
    })

    describe('edge cases', () => {
        it('should handle empty results', async () => {
            const mockLoad = vi.fn(async () => ({
                items: [],
                hasMore: false,
                total: 0,
            }))

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()
            await pagination.loadMore()

            expect(pagination.items.value).toEqual([])
            expect(pagination.hasMore.value).toBe(false)
            expect(pagination.total.value).toBe(0)
        })

        it('should handle result without total', async () => {
            const mockLoad = vi.fn(async (page: number) => ({
                items: createMockUsers(page, 20),
                hasMore: true,
            }))

            const useUsers = defineInfinitePagination<[], IUser>(() => ({
                load: mockLoad,
            }))

            const pagination = useUsers()
            await pagination.loadMore()

            expect(pagination.items.value).toHaveLength(20)
            expect(pagination.total.value).toBeUndefined()
        })
    })
})

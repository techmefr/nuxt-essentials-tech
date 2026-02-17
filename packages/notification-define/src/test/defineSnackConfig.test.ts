import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineSnackConfig } from '../defineSnackConfig'

const defaultPresets = {
    success: { color: '#4CAF50', textColor: '#fff', icon: 'mdi-check-circle', timeout: 3000 },
    error: { color: '#F44336', textColor: '#fff', icon: 'mdi-alert-circle', timeout: 0 },
    warning: { color: '#FF9800', textColor: '#fff', icon: 'mdi-alert', timeout: 5000 },
    info: { color: '#2196F3', textColor: '#fff', icon: 'mdi-information', timeout: 4000 },
}

beforeEach(() => {
    vi.useFakeTimers()
})

describe('defineSnackConfig', () => {
    describe('show and items', () => {
        it('creates empty notification list', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            expect(snack.items.value).toEqual([])
            expect(snack.activeCount.value).toBe(0)
        })

        it('adds a notification via show', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const id = snack.show('success', 'Item saved')

            expect(snack.items.value).toHaveLength(1)
            expect(snack.items.value[0].slug).toBe('success')
            expect(snack.items.value[0].content).toBe('Item saved')
            expect(snack.items.value[0].preset).toEqual(defaultPresets.success)
            expect(typeof id).toBe('string')
        })

        it('adds notification with overrides', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const handler = vi.fn()
            snack.show('error', 'Network error', {
                actions: [{ label: 'Retry', handler }],
                closable: false,
            })

            expect(snack.items.value[0].actions).toHaveLength(1)
            expect(snack.items.value[0].actions[0].label).toBe('Retry')
            expect(snack.items.value[0].closable).toBe(false)
        })

        it('uses unknown preset slug without crashing', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('custom', 'Custom notification')

            expect(snack.items.value).toHaveLength(1)
            expect(snack.items.value[0].preset).toEqual({})
        })
    })

    describe('dynamic slug shortcuts', () => {
        it('generates shortcut methods from preset keys', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            expect(typeof snack.success).toBe('function')
            expect(typeof snack.error).toBe('function')
            expect(typeof snack.warning).toBe('function')
            expect(typeof snack.info).toBe('function')
        })

        it('shortcut calls show with correct slug', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.success('Done')
            snack.error('Failed')

            expect(snack.items.value[0].slug).toBe('success')
            expect(snack.items.value[1].slug).toBe('error')
        })
    })

    describe('auto-dismiss', () => {
        it('auto-dismisses after preset timeout', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'Will disappear')
            expect(snack.items.value).toHaveLength(1)

            vi.advanceTimersByTime(3000)
            expect(snack.items.value).toHaveLength(0)
        })

        it('does not auto-dismiss when timeout is 0', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('error', 'Persistent error')

            vi.advanceTimersByTime(60000)
            expect(snack.items.value).toHaveLength(1)
        })

        it('does not auto-dismiss when isPersistent override is set', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'Sticky', { isPersistent: true })

            vi.advanceTimersByTime(60000)
            expect(snack.items.value).toHaveLength(1)
        })

        it('uses override timeout over preset timeout', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'Custom timeout', { timeout: 1000 })

            vi.advanceTimersByTime(1000)
            expect(snack.items.value).toHaveLength(0)
        })
    })

    describe('dismiss', () => {
        it('removes specific notification by id', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const id1 = snack.show('info', 'First')
            snack.show('info', 'Second')

            snack.dismiss(id1)

            expect(snack.items.value).toHaveLength(1)
            expect(snack.items.value[0].content).toBe('Second')
        })

        it('clears timer on manual dismiss', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const id = snack.show('success', 'Will be dismissed manually')
            snack.dismiss(id)

            expect(snack.items.value).toHaveLength(0)
            vi.advanceTimersByTime(5000)
            expect(snack.items.value).toHaveLength(0)
        })
    })

    describe('dismissAll', () => {
        it('removes all notifications instantly', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'A')
            snack.show('error', 'B')
            snack.show('info', 'C')

            snack.dismissAll()

            expect(snack.items.value).toHaveLength(0)
        })
    })

    describe('closeAll', () => {
        it('flags all notifications as closing', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'A')
            snack.show('error', 'B')

            snack.closeAll()

            expect(snack.items.value).toHaveLength(2)
            expect(snack.items.value.every(n => n.isClosing)).toBe(true)
        })

        it('activeCount excludes closing notifications', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'A')
            snack.show('error', 'B')
            expect(snack.activeCount.value).toBe(2)

            snack.closeAll()
            expect(snack.activeCount.value).toBe(0)
        })
    })

    describe('clearZone', () => {
        it('removes only notifications of a given slug', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'A')
            snack.show('error', 'B')
            snack.show('success', 'C')

            snack.clearZone('success')

            expect(snack.items.value).toHaveLength(1)
            expect(snack.items.value[0].slug).toBe('error')
        })
    })

    describe('update', () => {
        it('updates content of an existing notification', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const id = snack.show('info', 'Loading...')
            snack.update(id, { content: 'Done!' })

            expect(snack.items.value[0].content).toBe('Done!')
        })

        it('updates slug and resolves new preset', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const id = snack.show('info', 'Processing')
            snack.update(id, { slug: 'success', content: 'Completed' })

            expect(snack.items.value[0].slug).toBe('success')
            expect(snack.items.value[0].preset).toEqual(defaultPresets.success)
            expect(snack.items.value[0].content).toBe('Completed')
        })

        it('does nothing for unknown id', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('info', 'Hello')
            snack.update('nonexistent', { content: 'Nope' })

            expect(snack.items.value[0].content).toBe('Hello')
        })
    })

    describe('stacking', () => {
        it('stacks notifications by default', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            snack.show('success', 'A')
            snack.show('success', 'B')

            expect(snack.items.value).toHaveLength(2)
        })

        it('replaces same slug when stacking is false', () => {
            const useSnack = defineSnackConfig<[]>(() => ({
                presets: {
                    toast: { stacking: false, timeout: 3000 },
                },
            }))
            const snack = useSnack()

            snack.show('toast', 'First')
            snack.show('toast', 'Second')

            expect(snack.items.value).toHaveLength(1)
            expect(snack.items.value[0].content).toBe('Second')
        })

        it('does not replace different slug when stacking is false', () => {
            const useSnack = defineSnackConfig<[]>(() => ({
                presets: {
                    toast: { stacking: false, timeout: 3000 },
                    alert: { stacking: false, timeout: 0 },
                },
            }))
            const snack = useSnack()

            snack.show('toast', 'Toast msg')
            snack.show('alert', 'Alert msg')

            expect(snack.items.value).toHaveLength(2)
        })
    })

    describe('maxStack', () => {
        it('evicts oldest when maxStack is reached', () => {
            const useSnack = defineSnackConfig<[]>(() => ({
                presets: defaultPresets,
                maxStack: 2,
            }))
            const snack = useSnack()

            snack.show('info', 'First')
            snack.show('info', 'Second')
            snack.show('info', 'Third')

            expect(snack.items.value).toHaveLength(2)
            expect(snack.items.value[0].content).toBe('Second')
            expect(snack.items.value[1].content).toBe('Third')
        })
    })

    describe('priority', () => {
        it('inserts higher priority before lower priority', () => {
            const useSnack = defineSnackConfig<[]>(() => ({
                presets: {
                    toast: { priority: 0, timeout: 5000 },
                    alert: { priority: 10, timeout: 0 },
                },
            }))
            const snack = useSnack()

            snack.show('toast', 'Low priority')
            snack.show('alert', 'High priority')

            expect(snack.items.value[0].slug).toBe('alert')
            expect(snack.items.value[1].slug).toBe('toast')
        })
    })

    describe('deduplicate', () => {
        it('prevents duplicate string content within interval', () => {
            const useSnack = defineSnackConfig<[]>(() => ({
                presets: defaultPresets,
                deduplicate: true,
                deduplicateInterval: 2000,
            }))
            const snack = useSnack()

            snack.show('error', 'Network error')
            snack.show('error', 'Network error')

            expect(snack.items.value).toHaveLength(1)
        })

        it('allows duplicate after interval expires', () => {
            const useSnack = defineSnackConfig<[]>(() => ({
                presets: {
                    alert: { timeout: 0 },
                },
                deduplicate: true,
                deduplicateInterval: 1000,
            }))
            const snack = useSnack()

            snack.show('alert', 'Network error')
            vi.advanceTimersByTime(1500)
            snack.show('alert', 'Network error')

            expect(snack.items.value).toHaveLength(2)
        })

        it('allows different content on same slug', () => {
            const useSnack = defineSnackConfig<[]>(() => ({
                presets: defaultPresets,
                deduplicate: true,
            }))
            const snack = useSnack()

            snack.show('error', 'Error A')
            snack.show('error', 'Error B')

            expect(snack.items.value).toHaveLength(2)
        })
    })

    describe('promise', () => {
        it('shows pending then resolves to success', async () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const result = snack.promise(Promise.resolve(42), {
                pending: { content: 'Loading...' },
                success: { content: 'Done!' },
                error: { content: 'Failed' },
            })

            expect(snack.items.value).toHaveLength(1)
            expect(snack.items.value[0].content).toBe('Loading...')

            await result

            expect(snack.items.value[0].content).toBe('Done!')
            expect(snack.items.value[0].slug).toBe('success')
        })

        it('shows pending then resolves to error', async () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const failing = Promise.reject(new Error('oops'))

            try {
                await snack.promise(failing, {
                    pending: { content: 'Saving...' },
                    success: { content: 'Saved' },
                    error: { content: 'Save failed' },
                })
            } catch (_e) {
                // expected
            }

            expect(snack.items.value[0].content).toBe('Save failed')
            expect(snack.items.value[0].slug).toBe('error')
        })

        it('uses dynamic content from function on success', async () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            await snack.promise(Promise.resolve({ name: 'Alice' }), {
                pending: { content: 'Loading user...' },
                success: { content: result => `Welcome ${result.name}` },
                error: { content: 'Failed to load' },
            })

            expect(snack.items.value[0].content).toBe('Welcome Alice')
        })

        it('uses dynamic content from function on error', async () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            try {
                await snack.promise(Promise.reject(new Error('timeout')), {
                    pending: { content: 'Connecting...' },
                    success: { content: 'Connected' },
                    error: { content: err => `Connection failed: ${err.message}` },
                })
            } catch (_e) {
                // expected
            }

            expect(snack.items.value[0].content).toBe('Connection failed: timeout')
        })

        it('auto-dismisses after promise resolves', async () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            await snack.promise(Promise.resolve('ok'), {
                pending: { content: 'Working...' },
                success: { content: 'Done' },
                error: { content: 'Failed' },
            })

            expect(snack.items.value).toHaveLength(1)
            vi.advanceTimersByTime(3000)
            expect(snack.items.value).toHaveLength(0)
        })

        it('uses custom slugs for each stage', async () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            await snack.promise(Promise.resolve('ok'), {
                pending: { slug: 'warning', content: 'Please wait...' },
                success: { slug: 'info', content: 'All good' },
                error: { content: 'Nope' },
            })

            expect(snack.items.value[0].slug).toBe('info')
            expect(snack.items.value[0].preset).toEqual(defaultPresets.info)
        })
    })

    describe('component content', () => {
        it('accepts component as content', () => {
            const useSnack = defineSnackConfig<[]>(() => ({ presets: defaultPresets }))
            const snack = useSnack()

            const FakeComponent = { render: () => null }
            snack.show('info', FakeComponent, {
                contentProps: { link: '/dashboard' },
            })

            expect(snack.items.value[0].content).toStrictEqual(FakeComponent)
            expect(snack.items.value[0].contentProps).toEqual({ link: '/dashboard' })
        })
    })
})

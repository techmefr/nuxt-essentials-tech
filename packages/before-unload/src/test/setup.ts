import { vi } from 'vitest'
import { ref, computed } from 'vue'

vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)

global.window = {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    confirm: vi.fn(() => true),
} as unknown as Window & typeof globalThis

global.document = {
    querySelectorAll: vi.fn(() => []),
} as unknown as Document

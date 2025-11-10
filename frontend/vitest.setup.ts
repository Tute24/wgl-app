import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('zustand')
vi.mock('zustand/vanilla')

afterEach(() => {
  sessionStorage.clear()
  cleanup()
})

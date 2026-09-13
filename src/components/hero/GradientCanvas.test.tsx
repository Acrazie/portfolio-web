import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { LocaleProvider } from '@/components/site/LocaleProvider'
import { GradientCanvas } from './GradientCanvas'

afterEach(() => vi.restoreAllMocks())

it('keeps a static fallback and exposes an explicit pause control', async () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  const user = userEvent.setup()
  const { container } = render(<LocaleProvider><GradientCanvas /></LocaleProvider>)

  expect(container.querySelector('.gradient-canvas-fallback')).toBeInTheDocument()
  const control = screen.getByRole('button', { name: 'Mettre l’animation en pause' })
  await user.click(control)
  expect(screen.getByRole('button', { name: 'Reprendre l’animation' })).toHaveAttribute('aria-pressed', 'true')
  expect(container.querySelector('[data-animation="paused"]')).toBeInTheDocument()
})

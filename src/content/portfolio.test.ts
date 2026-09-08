import { expect, it } from 'vitest'
import { portfolio } from './portfolio'
it('keeps the unverified portfolio explicitly draft without invented links', () => {
  expect(portfolio.contentStatus).toBe('draft')
  expect(portfolio.projects).toHaveLength(3)
  expect(portfolio.projects.every(p => p.status === 'Content pending')).toBe(true)
  expect(portfolio.links).toEqual([])
})

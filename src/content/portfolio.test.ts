import { expect, it } from 'vitest'
import { getProject, portfolio } from './portfolio'

it('keeps bilingual copy and only verified public facts', () => {
  expect(portfolio.contentStatus).toBe('draft')
  expect(portfolio.displayName).toBe('Mayeul')
  expect(portfolio.email).toBe('mayeul.desbazeille@gmail.com')
  expect(Object.keys(portfolio.copy)).toEqual(['fr', 'en'])
  expect(portfolio.links.map(link => link.href)).toEqual([
    'https://github.com/acrazie',
    'https://www.linkedin.com/in/mayeuld/',
    'https://www.skills.sh/acrazie',
  ])
  expect(portfolio.education.map(item => item.institution)).toEqual([
    'Marcq Institution',
    'ISG',
    'Epitech',
  ])
})

it('supports a scalable project index and slug lookup', () => {
  expect(portfolio.projects).toHaveLength(1)
  expect(getProject('portfolio-web')).toBe(portfolio.projects[0])
  expect(getProject('missing')).toBeUndefined()
})

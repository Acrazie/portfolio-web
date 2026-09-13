import { expect, it } from 'vitest'
import { portfolio } from './portfolio'

it('keeps draft status, bilingual copy, and only verified public destinations', () => {
 expect(portfolio.contentStatus).toBe('draft')
 expect(portfolio.displayName).toBe('Mayeul')
 expect(portfolio.githubHandle).toBe('acrazie')
 expect(Object.keys(portfolio.copy)).toEqual(['fr','en'])
 expect(portfolio.links.map(link=>link.href)).toEqual([
  'https://github.com/acrazie',
  'https://www.linkedin.com/in/mayeuld/',
  'https://www.skills.sh/acrazie',
  'mailto:mayeul.desbazeille@gmail.com',
 ])
 expect(portfolio.copy.fr.experience.status).toBe('Données en préparation')
 expect(portfolio.copy.fr.education.status).toBe('Données en préparation')
})

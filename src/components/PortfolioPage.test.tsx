import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PortfolioPage } from './PortfolioPage'
it('presents semantic draft content with truthful non-clickable work and anchor navigation', () => {
 render(<PortfolioPage />)
 expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1)
 expect(screen.getByRole('heading',{level:1})).toHaveTextContent('Engineering dependable software')
 for(const [name,id] of [['Work','work'],['Capabilities','capabilities'],['Contact','contact']]) expect(screen.getByRole('link',{name})).toHaveAttribute('href',`#${id}`)
 const work=screen.getByRole('region',{name:'Selected work'})
 expect(within(work).getAllByText('Content pending')).toHaveLength(3)
 expect(within(work).queryAllByRole('link')).toHaveLength(0)
 expect(screen.getByRole('region',{name:'Contact'})).toHaveTextContent('Content pending')
 expect(screen.getByRole('link',{name:/Explore the structure/})).toHaveAttribute('href','#capabilities')
})

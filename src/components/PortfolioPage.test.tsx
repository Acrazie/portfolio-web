import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PortfolioPage } from './PortfolioPage'
it('presents semantic draft content with truthful non-clickable work and anchor navigation', () => {
 render(<PortfolioPage />)
 expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1)
 expect(screen.getByRole('heading',{level:1})).toHaveTextContent('Software. With a new perspective.')
 for(const [name,id] of [['Work','work'],['Capabilities','capabilities'],['Contact','contact']]) expect(screen.getByRole('link',{name})).toHaveAttribute('href',`#${id}`)
 const hero=screen.getByRole('region',{name:'Software. With a new perspective.'})
 expect(hero).not.toHaveTextContent(/Content pending|Demand render|execution graph|constellation/i)
 const work=screen.getByRole('region',{name:'Selected work'})
 expect(within(work).getAllByText('Content pending')).toHaveLength(3)
 expect(within(work).queryAllByRole('link')).toHaveLength(0)
 expect(screen.getByRole('region',{name:'Contact'})).toHaveTextContent('Content pending')
 expect(screen.queryByRole('link',{name:/Explore capabilities/})).toBeNull()
 expect(screen.getByRole('heading',{level:1})).toHaveClass('sr-only')
 expect(screen.getByRole('link',{name:/Scroll to explore/})).toHaveAttribute('href','#capabilities')
})
it('keeps one fixed page-level canvas host outside the hero and a semantic final word after credits',()=>{
 render(<PortfolioPage />)
 const host=screen.getByTestId('logo-particles'),hero=screen.getByRole('region',{name:'Software. With a new perspective.'})
 expect(hero.contains(host)).toBe(false)
 expect(hero).not.toHaveClass('isolate')
 expect(host).toHaveClass('fixed','pointer-events-none')
 expect(screen.getByTestId('particle-word')).toHaveTextContent('MAYEUL')
 expect(screen.queryByText('Animate MAYEUL')).not.toBeInTheDocument()
 expect(screen.getByTestId('particle-word').closest('button,[role=button]')).toBeNull()
 expect(screen.getByTestId('particle-word').compareDocumentPosition(screen.getByRole('contentinfo')) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy()
})

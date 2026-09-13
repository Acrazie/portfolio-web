import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { PortfolioPage } from './PortfolioPage'

it('presents truthful French content and verified destinations', () => {
 render(<PortfolioPage />)
 const heading=screen.getByRole('heading',{level:1})
 expect(heading).toHaveTextContent('Mayeul')
 expect(heading).toHaveTextContent('Software Engineer · AI Engineer')
 const navigation=screen.getByRole('navigation',{name:'Navigation principale'})
 for(const [name,id] of [['Travail','work'],['Expertise','capabilities'],['Skills','skills'],['Contact','contact']]) {
  expect(within(navigation).getByRole('link',{name})).toHaveAttribute('href',`#${id}`)
 }
 const work=screen.getByRole('region',{name:'Travail sélectionné'})
 expect(within(work).getByRole('link',{name:'Voir le dépôt'})).toHaveAttribute('href','https://github.com/acrazie/portfolio-web')
 expect(screen.getByRole('heading',{name:'Entreprise & parcours'})).toBeInTheDocument()
 expect(screen.getByRole('heading',{name:'Formation'})).toBeInTheDocument()
 expect(screen.getByRole('region',{name:'Construisons quelque chose de fiable.'})).toHaveTextContent('mayeul.desbazeille@gmail.com')
})

it('switches the complete interface to English and updates the document language',async()=>{
 const user=userEvent.setup()
 render(<PortfolioPage />)
 await user.click(screen.getByRole('button',{name:'Langue : français. Passer en anglais'}))
 expect(document.documentElement).toHaveAttribute('lang','en')
 expect(screen.getByRole('navigation',{name:'Primary navigation'})).toBeInTheDocument()
 expect(screen.getByRole('heading',{name:'Education'})).toBeInTheDocument()
 expect(screen.getByRole('link',{name:'Send an email'})).toHaveAttribute('href','mailto:mayeul.desbazeille@gmail.com')
})

it('keeps one fixed page-level canvas host and a semantic final word after the footer',()=>{
 render(<PortfolioPage />)
 const host=screen.getByTestId('logo-particles'),hero=screen.getByRole('region',{name:/Mayeul/})
 expect(hero.contains(host)).toBe(false)
 expect(host).toHaveClass('fixed','pointer-events-none')
 expect(screen.getByTestId('particle-word')).toHaveTextContent('MAYEUL')
 expect(screen.getByTestId('particle-word').closest('button,[role=button]')).toBeNull()
 expect(screen.getByTestId('particle-word').compareDocumentPosition(screen.getByRole('contentinfo')) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy()
})

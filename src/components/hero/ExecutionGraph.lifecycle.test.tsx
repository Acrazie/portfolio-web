import {expect,it,vi} from 'vitest'
import {render,screen,waitFor} from '@testing-library/react'
import {PortfolioPage} from '../PortfolioPage'
vi.mock('./ExecutionGraphScene',()=>({default:()=>{throw new Error('scene failed')}}))
it('a thrown lazy scene restores both static fallbacks and removes animation controls',async()=>{
 vi.stubGlobal('WebGLRenderingContext',class {})
 const error=vi.spyOn(console,'error').mockImplementation(()=>{})
 const page=render(<PortfolioPage />)
 await waitFor(()=>expect(error).toHaveBeenCalled())
 await waitFor(()=>expect(screen.queryByRole('button',{name:'Mettre l’animation en pause'})).toBeNull())
 expect(screen.getByTestId('logo-particles')).toHaveStyle({visibility:'hidden'})
 expect(screen.getByTestId('execution-graph-fallback')).toBeVisible()
 expect(screen.getByTestId('particle-word')).toBeVisible()
 expect(screen.getByTestId('particle-word').style.color).not.toBe('transparent')
 page.unmount();vi.restoreAllMocks();vi.unstubAllGlobals()
})

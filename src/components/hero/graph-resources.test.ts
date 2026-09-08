import { expect,it,vi } from 'vitest'
import { createGraphResources } from './graph-resources'
it('releases all owned GPU resources once when the scene unmounts',()=>{
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({clearRect(){},fillText(){}} as never)
 const resources=createGraphResources()
 const geometry=vi.spyOn(resources.geometry,'dispose'),material=vi.spyOn(resources.material,'dispose'),atlas=vi.spyOn(resources.atlas,'dispose')
 expect(resources.geometry.getAttribute('position').count).toBe(240)
 expect(resources.material.isShaderMaterial).toBe(true)
 resources.dispose();resources.dispose()
 expect(geometry).toHaveBeenCalledOnce();expect(material).toHaveBeenCalledOnce();expect(atlas).toHaveBeenCalledOnce()
 vi.restoreAllMocks()
})

import { expect, it, vi } from 'vitest'
import { GLYPHS, getGlyphAtlasLayout, createGlyphAtlas } from './create-glyph-atlas'
it('maps a stable glyph alphabet into padded power-of-two atlas cells', () => {
 expect(GLYPHS).toBe('.:-=+*#%@{}<>/\\[]01')
 const layout = getGlyphAtlasLayout()
 expect(layout.size).toBe(512); expect(layout.cellSize).toBe(64)
 expect(layout.cells).toHaveLength(GLYPHS.length)
 expect(layout.cells.every(c=>c.u>=0 && c.v>=0 && c.u+c.width<=1 && c.v+c.height<=1)).toBe(true)
})
it('creates a disposable CanvasTexture and reports unavailable canvas', () => {
 const context = {clearRect:vi.fn(), fillText:vi.fn()}
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue(context as never)
 const texture = createGlyphAtlas()
 expect(texture.isCanvasTexture).toBe(true)
 expect(context.fillText).toHaveBeenCalledTimes(GLYPHS.length)
 const disposed = vi.fn(); texture.addEventListener('dispose',disposed); texture.dispose(); expect(disposed).toHaveBeenCalledOnce()
 vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null)
 expect(()=>createGlyphAtlas()).toThrow('Glyph atlas requires a browser canvas')
 vi.restoreAllMocks()
})

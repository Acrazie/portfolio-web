import type {V} from './pointer-push'
// Small coherent motion in the body, looser original ink at the contour.
export function livingOffset(time:number,phase:number,edge:number,pointer:V,enabled=true):V {
 if(!enabled)return {x:0,y:0}
 const amplitude=1.2+edge*6,depth=2+edge*10+Math.sin(phase)*1.5
 return {x:Math.sin(time*.48+phase)*amplitude+pointer.x*depth,y:Math.cos(time*.37+phase)*amplitude+pointer.y*depth}
}

import type { ReactNode } from 'react'
export function Reveal({children,delay=0}: {children:ReactNode;delay?:number}) {
 void delay
 return <div>{children}</div>
}

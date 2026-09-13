import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/components/site/LocaleProvider'

type GradientCanvasProps = {
  className?: string
}

const FRAME_INTERVAL = 1000 / 30
const MAX_DPR = 1.5

function radial(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  inner: string,
  outer = 'rgba(0,0,0,0)',
) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
  gradient.addColorStop(0, inner)
  gradient.addColorStop(1, outer)
  context.fillStyle = gradient
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
}

function paint(context: CanvasRenderingContext2D, width: number, height: number, elapsed: number) {
  const motion = elapsed / 9000
  const breathe = Math.sin(motion * Math.PI * 2)
  const drift = Math.cos(motion * Math.PI * 1.4)
  const field = Math.sqrt(width * height)

  context.clearRect(0, 0, width, height)

  const base = context.createLinearGradient(0, 0, 0, height)
  base.addColorStop(0, '#020617')
  base.addColorStop(0.62, '#071a62')
  base.addColorStop(1, '#4338ca')
  context.fillStyle = base
  context.fillRect(0, 0, width, height)

  context.globalCompositeOperation = 'screen'
  const pair = (
    x: number,
    y: number,
    radius: number,
    color: string,
  ) => {
    radial(context, x, y, radius, color)
    radial(context, width - x, y, radius, color)
  }

  pair(width * (0.23 + drift * 0.018), height * (0.19 + breathe * 0.025), field * 0.28, 'rgba(38, 96, 255, .96)')
  pair(width * (0.2 - breathe * 0.016), height * (0.43 + drift * 0.018), field * 0.24, 'rgba(96, 48, 255, .92)')
  pair(width * (0.39 + breathe * 0.012), height * (0.27 - drift * 0.02), field * 0.18, 'rgba(126, 154, 255, .8)')
  radial(context, width * 0.5, height * (0.46 + breathe * 0.025), field * 0.23, 'rgba(18, 62, 221, .88)')
  pair(width * (0.43 + drift * 0.01), height * (0.67 + breathe * 0.014), field * 0.26, 'rgba(92, 72, 255, .76)')

  context.globalCompositeOperation = 'source-over'
  radial(context, width * 0.5, height * (0.07 + drift * 0.01), field * 0.22, 'rgba(0, 4, 26, .68)')
  pair(width * (0.36 - breathe * 0.01), height * (0.55 + drift * 0.012), field * 0.15, 'rgba(0, 4, 26, .58)')

  const topShade = context.createLinearGradient(0, 0, 0, height * 0.58)
  topShade.addColorStop(0, 'rgba(0, 4, 26, .52)')
  topShade.addColorStop(1, 'rgba(0, 4, 26, 0)')
  context.fillStyle = topShade
  context.fillRect(0, 0, width, height * 0.62)

  context.globalAlpha = 1
}

export function GradientCanvas({ className = '' }: GradientCanvasProps) {
  const { copy } = useLocale()
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!host || !canvas || !context) return

    let frame = 0
    let lastPaint = -FRAME_INTERVAL
    let visible = true
    let pageVisible = document.visibilityState !== 'hidden'

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = Math.max(1, Math.round(bounds.width * dpr))
      canvas.height = Math.max(1, Math.round(bounds.height * dpr))
      canvas.style.width = `${bounds.width}px`
      canvas.style.height = `${bounds.height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      paint(context, bounds.width, bounds.height, performance.now())
    }

    const loop = (time: number) => {
      if (time - lastPaint >= FRAME_INTERVAL) {
        const bounds = host.getBoundingClientRect()
        paint(context, bounds.width, bounds.height, time)
        lastPaint = time
      }
      frame = window.requestAnimationFrame(loop)
    }

    const reconcile = () => {
      const shouldRun = visible && pageVisible && !paused && !reducedMotion
      window.cancelAnimationFrame(frame)
      frame = 0
      if (shouldRun) frame = window.requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      pageVisible = document.visibilityState !== 'hidden'
      reconcile()
    }

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize)
    const intersectionObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      reconcile()
    }, { rootMargin: '80px' })

    resize()
    resizeObserver?.observe(host)
    intersectionObserver?.observe(host)
    document.addEventListener('visibilitychange', onVisibility)
    reconcile()

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [paused, reducedMotion])

  return (
    <div
      ref={hostRef}
      className={`gradient-canvas ${className}`}
      data-animation={reducedMotion ? 'reduced' : paused ? 'paused' : 'playing'}
    >
      <div aria-hidden="true" className="gradient-canvas-fallback absolute inset-0" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
      <div aria-hidden="true" className="gradient-canvas-fade absolute inset-0" />
      {!reducedMotion && (
        <Button
          type="button"
          variant="default"
          size="sm"
          className="absolute bottom-6 right-5 z-10 sm:bottom-8 sm:right-10 lg:right-16"
          aria-label={paused ? copy.motion.resume : copy.motion.pause}
          aria-pressed={paused}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? copy.motion.playShort : copy.motion.pauseShort}
        </Button>
      )}
    </div>
  )
}

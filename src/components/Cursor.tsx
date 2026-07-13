import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export default function Cursor() {
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)

  if (isTouchDevice()) return null

  const blobX = useSpring(x, { stiffness: 60, damping: 18, mass: 1 })
  const blobY = useSpring(y, { stiffness: 60, damping: 18, mass: 1 })

  const dotX = useSpring(x, { stiffness: 400, damping: 28 })
  const dotY = useSpring(y, { stiffness: 400, damping: 28 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <>
      {/* Soft glow blob — follows lazily */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(96,165,250,0.13) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />

      {/* Small crisp dot — snaps quickly */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          background: 'rgba(96,165,250,0.85)',
          boxShadow: '0 0 8px 2px rgba(96,165,250,0.5)',
        }}
      />
    </>
  )
}

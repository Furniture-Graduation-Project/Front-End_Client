import React from 'react'
import { motion } from 'framer-motion'
interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  speedX: number
  speedY: number
}

const Confetti: React.FC = () => {
  const colors = ['#FF5630', '#38CB89', '#377DFF', '#FFAB00', '#FEFEFE']

  const confettiOne: ConfettiPiece[] = Array.from({ length: 30 }).map(() => ({
    id: Math.random(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    speedX: Math.random() * 2 + 1, 
    speedY: Math.random() * 2 + 2
  }))

  const confettiTwo = Array.from({ length: 30 }).map(() => ({
    id: Math.random(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    speedX: Math.random() * -2 - 1,
    speedY: Math.random() * 2 + 2
  }))

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {confettiOne.map((piece) => (
          <motion.div
            key={piece.id}
            style={{
              position: 'absolute',
              top: piece.y,
              left: piece.x,
              width: '15px',
              height: '5px',
              backgroundColor: piece.color,
              transformOrigin: 'center'
            }}
            animate={{
              x: piece.x + piece.speedX * 100,
              y: piece.y + piece.speedY * 100,
              rotate: piece.rotation,
              opacity: [1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {confettiTwo.map((piece) => (
          <motion.div
            key={piece.id}
            style={{
              position: 'absolute',
              top: piece.y,
              left: piece.x,
              width: '15px',
              height: '5px',
              backgroundColor: piece.color,
              transformOrigin: 'center'
            }}
            animate={{
              x: -piece.x + piece.speedX * 100,
              y: piece.y + piece.speedY * 100,
              rotate: piece.rotation,
              opacity: [1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>
    </>
  )
}

export default Confetti

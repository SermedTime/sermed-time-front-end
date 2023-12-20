import { ReactNode } from 'react'

import { motion } from 'framer-motion'

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

interface Props {
  children: ReactNode
}

export function AnimatedPage({ children }: Props) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      style={{
        minHeight: 'calc(100vh - 256px)',
        position: 'relative',
        width: '100%'
      }}
    >
      {children}
    </motion.div>
  )
}

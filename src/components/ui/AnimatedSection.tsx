import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedSectionProps {
  children: React.ReactNode
  variants: Variants
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, variants }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div ref={ref} variants={variants} initial='hidden' animate={inView ? 'visible' : 'hidden'}>
      {children}
    </motion.div>
  )
}

export default AnimatedSection

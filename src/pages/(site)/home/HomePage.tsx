import { motion } from 'framer-motion'
import { CarouselSize } from './_components/Arrivals'
import Articles from './_components/Articles'
import Banner from './_components/Banner'
import BannerGrid from './_components/BannerGrid'
import Newsletter from './_components/Newsletter'
import Sale from './_components/Sale'
import Values from './_components/Values'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Collection from './_components/Collection'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
}

const bounce = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, type: 'spring', stiffness: 300 } }
}

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2 } }
}

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4
    }
  }
}

const HomePage = () => {
  return (
    <motion.div initial='hidden' animate='visible' variants={staggerContainer}>
      <AnimatedSection variants={zoomIn}>
        <Banner />
      </AnimatedSection>
      <AnimatedSection variants={fadeInUp}>
        <BannerGrid />
      </AnimatedSection>
      <AnimatedSection variants={fadeIn}>
        <CarouselSize />
      </AnimatedSection>
      <AnimatedSection variants={fadeIn}>
        <Collection />
      </AnimatedSection>
      <AnimatedSection variants={scaleUp}>
        <Values bgColor='' />
      </AnimatedSection>
      <AnimatedSection variants={bounce}>
        <Sale />
      </AnimatedSection>
      <AnimatedSection variants={scaleUp}>
        <Articles />
      </AnimatedSection>
      <AnimatedSection variants={slideIn}>
        <Newsletter />
      </AnimatedSection>
    </motion.div>
  )
}

export default HomePage

import { motion } from 'framer-motion'
import Container from '@/components/Container'
import { BreadcrumbContact } from './_components/Breadcrumb'
import HeaderContent from './_components/HeaderContent'
import FeatureSection from './_components/FeatureSection'
import ContactSection from './_components/ContactSection'
import FormContact from './_components/FormContact'
import Values from '../home/_components/Values'
import AnimatedSection from '@/components/ui/AnimatedSection'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
}

const bounce = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, type: 'spring', stiffness: 300 } }
}

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
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

const ContactUsPage = () => {
  return (
    <motion.div initial='hidden' animate='visible' variants={staggerContainer}>
      <Container>
        <AnimatedSection variants={fadeInUp}>
          <BreadcrumbContact />
        </AnimatedSection>
        <AnimatedSection variants={slideIn}>
          <HeaderContent />
        </AnimatedSection>
        <AnimatedSection variants={fadeInUp}>
          <FeatureSection />
        </AnimatedSection>
        <AnimatedSection variants={fadeInUp}>
          <ContactSection />
        </AnimatedSection>
        <AnimatedSection variants={bounce}>
          <FormContact />
        </AnimatedSection>
      </Container>
      <AnimatedSection variants={fadeInUp}>
        <Values bgColor='bg-[#F3F5F7]' />
      </AnimatedSection>
    </motion.div>
  )
}

export default ContactUsPage

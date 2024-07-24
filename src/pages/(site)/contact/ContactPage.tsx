import Container from '@/components/Container'
import { BreadcrumbContact } from './_components/Breadcrumb'
import HeaderContent from './_components/HeaderContent'
import FeatureSection from './_components/FeatureSection'
import ContactSection from './_components/ContactSection'
import FormContact from './_components/FormContact'
import Values from '../home/_components/Values'

const ContactUsPage = () => {
  return (
    <>
      <Container>
        <BreadcrumbContact />
        <HeaderContent />
        <FeatureSection />
        <ContactSection />
        <FormContact />
      </Container>
      <Values bgColor='bg-[#F3F5F7]' />
    </>
  )
}

export default ContactUsPage

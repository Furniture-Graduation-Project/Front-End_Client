import Container from '@/components/Container'
import Checkout from './_components/Checkout'
import TextTitle from '@/components/ui/textTitle'
import { useTranslate } from '@/hooks/useTranslate'
import AnimatedSection from '@/components/ui/AnimatedSection'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
}

const CheckoutPage = () => {
  const { t } = useTranslate('checkout.textTitle')

  return (
    <>
      <Container className='px-8 sm:px-0'>
        <AnimatedSection variants={fadeInUp}>
          <TextTitle checkout title={t('title')} />
        </AnimatedSection>
        <Checkout />
      </Container>
    </>
  )
}

export default CheckoutPage

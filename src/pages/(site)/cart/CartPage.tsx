import Container from '@/components/Container'
import Cart from './_components/Cart'
import TextTitle from '@/components/ui/textTitle'
import { useTranslate } from '@/hooks/useTranslate'
import AnimatedSection from '@/components/ui/AnimatedSection'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
}

const CartPage = () => {
  const { t } = useTranslate('cart.textTitle')
  return (
    <div>
      <Container className='px-8 sm:px-0'>
        <AnimatedSection variants={fadeInUp}>
          <TextTitle title={t('cart')} />
        </AnimatedSection>
        <Cart />
      </Container>
    </div>
  )
}

export default CartPage

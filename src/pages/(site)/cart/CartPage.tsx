import Container from '@/components/Container'
import Cart from './_components/Cart'
import TextTitle from '@/components/ui/textTitle'
import { useTranslate } from '@/hooks/useTranslate'

const CartPage = () => {
  const { t } = useTranslate('cart.textTitle')
  return (
    <div>
      <Container className='px-8 sm:px-0'>
        <TextTitle title={t('cart')} />
        <Cart />
      </Container>
    </div>
  )
}

export default CartPage

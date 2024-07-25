import Container from '@/components/Container'
import CheckoutTitle from '@/components/ui/checkoutTitle'
import Cart from './_components/Cart'

const CartPage = () => {
  return (
    <div>
      <Container className='px-8 sm:px-0'>
        <CheckoutTitle title='Cart' />
        <Cart />
      </Container>
    </div>
  )
}

export default CartPage

import Container from '@/components/Container'
import CheckoutTitle from '@/components/ui/checkoutTitle'
import Checkout from './_components/Checkout'

const CheckoutPage = () => {
  return (
    <>
      <Container>
        <CheckoutTitle checkout={true} title='Check Out' />
        <Checkout />
      </Container>
    </>
  )
}

export default CheckoutPage

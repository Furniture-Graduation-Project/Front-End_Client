import Container from '@/components/Container'
import CheckoutTitle from '@/components/ui/textTitle'
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

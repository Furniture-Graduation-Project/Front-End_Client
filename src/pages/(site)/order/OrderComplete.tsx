import Container from '@/components/Container'
import TextTitle from '@/components/ui/textTitle'
import Order from './components/Order'

const OrderPage = () => {
  return (
    <>
      <Container>
        <TextTitle title='Complete!' order={true} />
        <Order />
      </Container>
    </>
  )
}

export default OrderPage

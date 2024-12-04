import Container from '@/components/Container'
import TextTitle from '@/components/site/textTitle'
import Order from './components/Order'
import Confetti from './components/Confetti'
import { useTranslate } from '@/hooks/useTranslate'

const OrderPage = () => {
  const { t } = useTranslate('order')
  return (
    <div className='relative overflow-hidden'>
      <Container>
        <TextTitle title={t('title')} order={true} />
        <Order />
        <Confetti />
      </Container>
    </div>
  )
}

export default OrderPage

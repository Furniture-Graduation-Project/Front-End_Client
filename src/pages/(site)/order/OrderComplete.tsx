import Container from '@/components/Container'
import TextTitle from '@/components/site/textTitle'
import Order from './components/Order'
import Confetti from './components/Confetti'
import { useTranslate } from '@/hooks/useTranslate'
import { useSingleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useParams } from 'react-router-dom'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useEffect } from 'react'

const OrderPage = () => {
  const { id } = useParams()
  const { t } = useTranslate('order')
  const { data, isLoading, isError } = useSingleOrderQuery(id || '')
  const [state, setState, removeState] = useSessionStorage('stateOrder', null)

  useEffect(() => {
    removeState()
  }, [])
  return (
    <div className='relative overflow-hidden'>
      <Container>
        <TextTitle title={t('title')} order={true} />
        <Order data={data} isLoading={isLoading} isError={isError} />
        {id && <Confetti />}
      </Container>
    </div>
  )
}

export default OrderPage

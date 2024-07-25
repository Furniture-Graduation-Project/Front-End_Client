import CartForm from './CartForm'
import CartTable from './CartTable'

const Cart = () => {
  return (
    <div className='my-20'>
      <div className='lg:grid lg:grid-cols-5 xl:grid-cols-3 gap-x-16'>
        <div className='xl:col-span-2 lg:col-span-3'>
          <CartTable />
        </div>
        <div className='mt-6 lg:mt-0 xl:col-span-1 lg:col-span-2'>
          <CartForm />
        </div>
      </div>
    </div>
  )
}

export default Cart

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center bg-white sm:rounded-xl py-20'>
      <div className='text-center h-full flex flex-col items-center justify-center'>
        <h1 className='text-neutral-4 hero'>404</h1>
        <div className='opacity-90'>
          <h3 className='headline-3 mb-4'>This page does not exist</h3>
          <p className='headline-7 text-neutral-4'>The page you are looking for could not be found.</p>
          <Link to='/'>
            <Button className='mt-9 px-4 py-2 sm:py-7 text-white rounded sm:text-xl font-bold'>
              Quay về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

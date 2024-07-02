import { ArticlesImage } from '@/assets'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ArticlesCard = () => {
  return (
    <>
      <div className='*:mb-3'>
        <img src={ArticlesImage} alt='' className='rounded-lg hover:scale-105 transform ease-in-out duration-500 ' />
        <h1 className='headline-7'>7 ways to decor your home</h1>
        <div className='flex items-center transition duration-500 ease-in-out transform hover:translate-x-1 hover:opacity-70'>
          <Link to={''} className='underline button-s'>
            Read More
          </Link>
          <ArrowRight className='h-4' />
        </div>
      </div>
    </>
  )
}

export default ArticlesCard

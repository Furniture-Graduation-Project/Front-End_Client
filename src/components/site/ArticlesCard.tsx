import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IBlog } from '@/interface/blog'
import { useTranslate } from '@/hooks/useTranslate'

interface ArticlesCardProps {
  blog: IBlog
}

const ArticlesCard = ({ blog }: ArticlesCardProps) => {
  const { t } = useTranslate('blog')

  return (
    <div className='mb-3'>
      <img
        src={blog.image}
        alt={blog.title}
        className='rounded-lg w-full h-72 object-cover hover:scale-105 transform ease-in-out duration-500'
      />
      <h1 className='headline-7'>{blog.title}</h1>
      <div className='flex items-center transition duration-500 ease-in-out transform hover:translate-x-1 hover:opacity-70'>
        <Link to={`/blog/${blog._id}`} className='underline button-s'>
          {t('readMore')}
        </Link>
        <ArrowRight className='h-4' />
      </div>
    </div>
  )
}

export default ArticlesCard

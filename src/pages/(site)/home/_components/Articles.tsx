import Container from '@/components/Container'
import ArticlesCard from '@/components/site/ArticlesCard'
import { useBlogQuery } from '@/hooks/queries/useBlogQuery'
import { useTranslate } from '@/hooks/useTranslate'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Articles = () => {
  const { t } = useTranslate('home.articles')
  const { blogs, isLoading, error } = useBlogQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const sortedBlogs = blogs?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <Container className='mt-[74px] sm:px-0 px-8'>
      <div className='flex justify-between *:font-medium mb-12 mt-9'>
        <div className='headline-5 sm:headline-4'>
          <h1>{t('title')}</h1>
        </div>
        <div className='flex items-center transition duration-500 ease-in-out transform hover:-translate-x-1 hover:opacity-70'>
          <Link to='/articles' className='underline font-medium text-[14px] sm:button-s'>
            {t('moreArticles')}
          </Link>
          <ArrowRight className='h-4' />
        </div>
      </div>
      <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-7'>
        {sortedBlogs?.slice(0, 3).map((blog) => <ArticlesCard key={blog._id} blog={blog} />)}
      </div>
    </Container>
  )
}

export default Articles

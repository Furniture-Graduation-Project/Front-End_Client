import { Calendar, User } from 'lucide-react'
import JoinNewsletter from './components/JoinNewsletter'
import RelatedPosts from './components/RelatedPosts'
import { Link, useParams } from 'react-router-dom'
import { useBlogDetailQuery } from '@/hooks/queries/useBlogQuery'
import { useTranslate } from '@/hooks/useTranslate'

const BlogDetailPage = () => {
  const { t } = useTranslate('blog')
  const { id } = useParams<{ id: string }>()
  const { data: blogData, isLoading, error } = useBlogDetailQuery(id || '')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading blog: {(error as Error).message}</div>
  if (!blogData || !blogData.data) return <div>Blog not found</div>

  const blog = blogData.data

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className='bg-white text-gray-900'>
          <div className='container mx-auto px-4 py-8'>
            <nav className='text-sm text-gray-500 mb-16'>
              <Link to='/' className='hover:underline'>
                {t('home')}
              </Link>
              <span className='mx-2'>&gt;</span>
              <Link to='/blog' className='hover:underline'>
                {t('blog')}
              </Link>
              <span className='mx-2'>&gt;</span>
              <span>{blog.title}</span>
            </nav>
            <article>
              <h1 className='text-xs font-bold text-gray-500 mb-2'>{t('ARTICLE')}</h1>
              <h2 className='text-4xl font-bold mb-4'>{blog.title}</h2>
              <div className='flex items-center text-sm text-gray-500'>
                <User className='mr-2' />
                <span className='mr-4'>{blog.employeeId?.fullName || 'Unknown Author'}</span>
                <Calendar className='mr-2' />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </article>
          </div>
        </div>
        <main>
          <section className='mb-8'>
            <img src={blog.image} alt={blog.title} className='w-full h-auto rounded-lg' />
          </section>
          <section className='mb-8'>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </section>
          <RelatedPosts />
        </main>
      </div>
      <JoinNewsletter />
    </>
  )
}

export default BlogDetailPage

import { ArrowRight, Calendar, User } from 'lucide-react'
import JoinNewsletter from './components/JoinNewsletter'
import RelatedPosts from './components/RelatedPosts'
import { Link, useParams } from 'react-router-dom'
import { useBlogDetailQuery, useBlogQuery } from '@/hooks/queries/useBlogQuery'
import { useTranslate } from '@/hooks/useTranslate'
import { formatDate } from '@/utils/formatDate'

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: blogData, isLoading, error } = useBlogDetailQuery(id || '')
  const { t } = useTranslate('blogDetail')
  const { blogs } = useBlogQuery()
  if (isLoading) return <div>{t('loading')}</div>
  if (error) return <div>Error loading blog: {(error as Error).message}</div>
  if (!blogData || !blogData.data) return <div>{t('blogNotFound')}</div>

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
              <h1 className='text-xs font-bold text-gray-500 mb-2'>{t('article')}</h1>
              <h2 className='text-4xl font-bold mb-4'>{blog.title}</h2>
              <div className='flex items-center text-sm text-gray-500'>
                <User className='mr-2' />
                {/* <span className='mr-4'>{blog.employeeId?.fullName || t('unknownAuthor')}</span> */}
                <span className='mr-4'>Nội thất River</span>
                <Calendar className='mr-2' />
                <span>{formatDate(blog.createdAt, 'vi-VN')}</span>
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

          <section className='mb-8'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-semibold'>{t('relatedPosts')}</h2>
              <Link to='/blog' className='text-gray-600 hover:text-gray-900 flex items-center'>
                {t('moreArticles')}
                <ArrowRight className='ml-2' />
              </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {blogs?.map((relatedBlog) => <RelatedPosts key={relatedBlog._id} blog={relatedBlog} />)}
            </div>
          </section>
        </main>
      </div>
      <JoinNewsletter />
    </>
  )
}

export default BlogDetailPage

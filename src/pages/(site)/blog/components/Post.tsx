import { Grid, GripHorizontal, Search } from 'lucide-react'
import { useBlogQuery } from '@/hooks/queries/useBlogQuery'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'
import { useTranslate } from '@/hooks/useTranslate'
import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/components/Container'

const Post = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const { blogs, isLoading, error } = useBlogQuery()
  const { t } = useTranslate('post')

  // Trạng thái để theo dõi số lượng blog được hiển thị
  const [limit, setLimit] = useState(6)
  const [showAll, setShowAll] = useState(false) // Trạng thái để theo dõi việc hiển thị tất cả các blog

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <Container key={index} className='grid grid-cols-3 gap-6 my-14'>
            <Skeleton className='w-[400px] h-[255px]' />
            <Skeleton className='w-[400px] h-[255px]' />
            <Skeleton className='w-[400px] h-[255px]' />
          </Container>
        ))}
      </>
    )
  }
  if (error) return <div className='text-center py-4 text-red-500'>{t('errorLoadingBlogs')}</div>
  if (!blogs || blogs.length === 0) return <div className='text-center py-4'>{t('noBlogsFound')}</div>

  const handleViewChange = (viewType: 'grid' | 'list') => {
    setView(viewType)
  }

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <section className='container mx-auto px-4 py-8'>
      <div className='flex flex-col gap-y-4 md:flex-row justify-between items-center mb-6'>
        <div className='flex gap-4'>
          <div className='text-gray-600 font-bold'>{t('allBlog')}</div>
          <div className='text-gray-600 font-bold'>{t('featured')}</div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder={t('searchBlogs')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          </div>
          <button
            onClick={() => handleViewChange('grid')}
            className={`text-gray-600 font-bold ${view === 'grid' ? 'text-black' : ''}`}
          >
            <GripHorizontal />
          </button>
          <button
            onClick={() => handleViewChange('list')}
            className={`text-gray-600 font-bold ${view === 'list' ? 'text-black' : ''}`}
          >
            <Grid />
          </button>
        </div>
      </div>

      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {filteredBlogs.slice(0, showAll ? filteredBlogs.length : limit).map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className='bg-white shadow rounded overflow-hidden'>
            <div className='relative'>
              <img
                alt={blog.title}
                className='w-full object-cover'
                src={blog.image}
                style={{ height: 'auto', aspectRatio: '16/9' }}
              />
            </div>
            <div className='p-4'>
              <h2 className='text-lg font-bold'>{blog.title}</h2>
              <p className='text-gray-600 mt-2'>{formatDate(blog.createdAt, 'vi-VN')}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && <div className='text-center py-4 text-gray-500'>{t('noBlogsMatchingSearch')}</div>}

      {/* Nút Show More / Show Less */}
      {filteredBlogs.length > limit && (
        <div className='text-center mt-8'>
          <button onClick={() => setShowAll(!showAll)} className='px-8 py-2 rounded-full border border-solid'>
            {showAll ? t('showLess') : t('showMore')}
          </button>
        </div>
      )}
    </section>
  )
}

export default Post

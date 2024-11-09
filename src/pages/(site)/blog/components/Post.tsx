import { ChevronDown, ChevronUp, Grid, GripHorizontal, List, Menu, Search } from 'lucide-react'
import { useBlogQuery } from '@/hooks/queries/useBlogQuery'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Post = () => {
  const [sortOrder, setSortOrder] = useState('asc')
  const [view, setView] = useState<'grid' | 'list' | 'bars' | 'menu'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const { blogs, isLoading, error, page, limit, handlePageChange, handleLimitChange } = useBlogQuery()

  if (isLoading) return <div className='text-center py-4'>Loading...</div>
  if (error) return <div className='text-center py-4 text-red-500'>Error loading blogs</div>
  if (!blogs || blogs.length === 0) return <div className='text-center py-4'>No blogs found</div>

  const handleSort = () => {
    const sortedBlogs = [...blogs].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleViewChange = (viewType: 'grid' | 'list' | 'bars' | 'menu') => {
    setView(viewType)
  }

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <section className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4'>
          <div className='text-gray-600 font-bold'>All Blog</div>
          <div className='text-gray-600 font-bold'>Featured</div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search blogs...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          </div>
          {/* <span className='text-gray-600 font-bold'>Sort by</span>
          <button onClick={handleSort} className='text-gray-600 font-bold'>
            {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
          </button> */}
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
          <button
            onClick={() => handleViewChange('bars')}
            className={`text-gray-600 font-bold ${view === 'bars' ? 'text-black' : ''}`}
          >
            <List />
          </button>
          <button
            onClick={() => handleViewChange('menu')}
            className={`text-gray-600 font-bold ${view === 'menu' ? 'text-black' : ''}`}
          >
            <Menu />
          </button>
        </div>
      </div>

      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {filteredBlogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className='bg-white shadow rounded overflow-hidden'>
            <img alt={blog.title} className='w-full h-48 object-cover' src={blog.image} />
            <div className='p-4'>
              <h2 className='text-lg font-bold'>{blog.title}</h2>
              <p className='text-gray-600 mt-2'>{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className='text-center py-4 text-gray-500'>No blogs found matching your search</div>
      )}

      <div className='text-center mt-8'>
        <button onClick={() => handleLimitChange(limit + 5)} className='px-8 py-2 rounded-full border border-solid'>
          Show more
        </button>
      </div>

      <div className='flex justify-center mt-8 gap-4'>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
        >
          Previous
        </button>
        <span className='px-4 py-2'>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={blogs.length < limit}
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default Post

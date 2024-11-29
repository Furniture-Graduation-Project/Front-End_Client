import { Link } from 'react-router-dom'
import { IBlog } from '@/interface/blog'

interface ArticlesCardProps {
  blog: IBlog
}

const RelatedPosts = ({ blog }: ArticlesCardProps) => {
  return (
    <div className='border p-4'>
      <img
        src={blog.image}
        alt={blog.title}
        className='w-full mb-4 rounded-lg hover:scale-105 transform ease-in-out duration-500'
      />
      <Link to={`/blog/${blog._id}`} className='text-blue-500 hover:underline'>
        <h3 className='text-xl font-bold mb-2'>{blog.title}</h3>
      </Link>
      <p className='text-gray-600 mt-2'>{new Date(blog.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default RelatedPosts

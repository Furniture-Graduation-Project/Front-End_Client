import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'animate.css';
import {
  faThLarge,
  faThList,
  faChevronUp,
  faChevronDown,
  faBars,
  faGripHorizontal
} from '@fortawesome/free-solid-svg-icons'
const Post = () => {
  const initialPosts = [
    {
      title: '7 ways to decor your home like a professional',
      date: 'October 15, 2023',
      image: 'https://storage.googleapis.com/a1aa/image/UJKinhdql9rVIBwIW2jLBUJFyqUZnYUYy3sCudZOMSkUcF5E.jpg',
      alt: 'Living room with modern decor'
    },
    {
      title: 'Inside a beautiful kitchen organization',
      date: 'October 15, 2023',
      image: 'https://storage.googleapis.com/a1aa/image/GEwlVLvgQ8pXHZLwD6KcZbGYNI9P9t1seZDn3G3pYj0o4KyJA.jpg',
      alt: 'Kitchen with organized shelves'
    },
    {
      title: 'Decor your bedroom for your children',
      date: 'October 15, 2023',
      image: 'https://storage.googleapis.com/a1aa/image/S88T2p0L8eTeNEeVTKZ7y7p2FXjo6AaWPfKQcDvkw0E9EXROB.jpg',
      alt: 'Bedroom with cozy decor'
    },
    {
      title: 'Modern texas home is beautiful and completely kid-friendly',
      date: 'October 15, 2023',
      image: 'https://storage.googleapis.com/a1aa/image/UJKinhdql9rVIBwIW2jLBUJFyqUZnYUYy3sCudZOMSkUcF5E.jpg',
      alt: 'Living room with modern decor'
    },
    {
      title: 'Modern texas home is beautiful and completely kid-friendly',
      date: 'October 15, 2023',
      image: 'https://storage.googleapis.com/a1aa/image/UJKinhdql9rVIBwIW2jLBUJFyqUZnYUYy3sCudZOMSkUcF5E.jpg',
      alt: 'Living room with modern decor'
    },
    {
      title: 'Modern texas home is beautiful and completely kid-friendly',
      date: 'October 15, 2023',
      image: 'https://storage.googleapis.com/a1aa/image/UJKinhdql9rVIBwIW2jLBUJFyqUZnYUYy3sCudZOMSkUcF5E.jpg',
      alt: 'Living room with modern decor'
    },
    {
      title: 'Modern texas home is beautiful and completely kid-friendly',
      date: 'October 15, 2024',
      image: 'https://storage.googleapis.com/a1aa/image/UJKinhdql9rVIBwIW2jLBUJFyqUZnYUYy3sCudZOMSkUcF5E.jpg',
      alt: 'Living room with modern decor'
    },
    {
      title: 'Modern texas home is beautiful and completely kid-friendly',
      date: 'October 15, 2023',
      image: 'https://storage.googleapis.com/a1aa/image/UJKinhdql9rVIBwIW2jLBUJFyqUZnYUYy3sCudZOMSkUcF5E.jpg',
      alt: 'Living room with modern decor'
    },
    {
      title: 'Modern texas home is beautiful and completely kid-friendly',
      date: 'October 15, 2022',
      image: 'https://storage.googleapis.com/a1aa/image/UJKinhdql9rVIBwIW2jLBUJFyqUZnYUYy3sCudZOMSkUcF5E.jpg',
      alt: 'Living room with modern decor'
    }
  ]
  const [posts, setPosts] = useState(initialPosts)
  const [sortOrder, setSortOrder] = useState('asc')
  const [view, setView] = useState('grid')

  const handleSort = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setPosts(sortedPosts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleViewChange = (viewType: any) => {
    setView(viewType)
  }

  return (
    <section className='container mx-auto px-4 py-8 animate__animated animate__fadeIn'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4'>
          <div className='text-gray-600 font-bold'>All Blog</div>
          <div className='text-gray-600 font-bold'>Featured</div>
        </div>
        <div className='flex items-center space-x-4'>
          <span className='text-gray-600 font-bold'>Sort by</span>
          <button onClick={handleSort} className='text-gray-600 font-bold'>
            <FontAwesomeIcon icon={sortOrder === 'asc' ? faChevronUp : faChevronDown} />
          </button>
          <button
            onClick={() => handleViewChange('grid')}
            className={`text-gray-600 font-bold ${view === 'grid' ? 'text-black' : ''}`}
          >
            <FontAwesomeIcon icon={faGripHorizontal} />
          </button>
          <button
            onClick={() => handleViewChange('list')}
            className={`text-gray-600 font-bold ${view === 'list' ? 'text-black' : ''}`}
          >
            <FontAwesomeIcon icon={faThLarge} />
          </button>
          <button
            onClick={() => handleViewChange('bars')}
            className={`text-gray-600 font-bold ${view === 'bars' ? 'text-black' : ''}`}
          >
            <FontAwesomeIcon icon={faThList} />
          </button>
          <button
            onClick={() => handleViewChange('grip')}
            className={`text-gray-600 font-bold ${view === 'grip' ? 'text-black' : ''}`}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {posts.map((post, index) => (
          <div key={index} className='bg-white shadow rounded overflow-hidden'>
            <img alt={post.alt} className='w-full h-48 object-cover' src={post.image} />
            <div className='p-4'>
              <h2 className='text-lg font-bold'>{post.title}</h2>
              <p className='text-gray-600 mt-2'>{post.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center mt-8'>
        <button className='px-8 py-2 rounded-full border border-solid'>Show more</button>
      </div>
    </section>
  )
}

export default Post

import React from 'react'
import 'animate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import RelatedPosts from './components/RelatedPosts'
import JoinNewsletter from './components/JoinNewsletter'

const BlogDetailPage = () => {
  return (
    <div className="">
      <div className='container mx-auto px-4 py-8 animate__animated animate__fadeIn'>
      <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-16">
          <a href="#" className="hover:underline">Home</a>
          <span className="mx-2">&gt;</span>
          <a href="#" className="hover:underline">Blog</a>
          <span className="mx-2">&gt;</span>
          <span>How to make a busy bathroom a place to relax</span>
        </nav>
        <article>
          <h1 className="text-xs font-bold text-gray-500 mb-2">ARTICLE</h1>
          <h2 className="text-4xl font-bold mb-4">How to make a busy bathroom a place to relax</h2>
          <div className="flex items-center text-sm text-gray-500">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <span className="mr-4">Henrik Annemark</span>
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            <span>October 16, 2023</span>
          </div>
        </article>
      </div>
    </div>
        <main>
          <section className='mb-8'>
            <img
              src='https://storage.googleapis.com/a1aa/image/BdIME0TjTC57MVWXgZ1Up4iQHIVyL9zNSl2XX8qQK6zFPG5E.jpg'
              alt='Modern bathroom with a bathtub and plants'
              className='w-full h-auto rounded-lg'
            />
          </section>
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-4'>A relaxing bath with built-in relaxation</h2>
            <p className='mb-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <img
                src='https://storage.googleapis.com/a1aa/image/JLmwfaeTcqqpzEa886D0EQ3aFe2MfOnlfelpw4p739HTEPG5E.jpg'
                alt='Bathroom with a modern sink and mirror'
                className='w-full h-auto rounded-lg'
              />
              <img
                src='https://storage.googleapis.com/a1aa/image/ENhPCX52oN5MMt2U1qKlTmau2A1HFqARyL26qFa3YNcGPG5E.jpg'
                alt='Bathroom with a wooden countertop and sink'
                className='w-full h-auto rounded-lg'
              />
            </div>
          </section>
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-4'>Storage ideas to spring refresh</h2>
            <p className='mb-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <img
                  src='https://storage.googleapis.com/a1aa/image/kwRbgWoSj4bzKJ8CySgAvPbjGnCJ3rFHfhjwWCvuP85KeYkTA.jpg'
                  alt='Dark bathroom with a towel hanging'
                  className='w-full h-auto rounded-lg mb-4'
                />
                <h3 className='text-xl font-bold mb-2'>It's your clutter-free easy access</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-2'>An ecosystem of towels</h3>
                <p className='mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
                <h3 className='text-xl font-bold mb-2'>Hideaway magic disappear</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            </div>
          </section>
          <RelatedPosts></RelatedPosts>
        </main>
      </div>
      <JoinNewsletter></JoinNewsletter>
      </div>
  )
}

export default BlogDetailPage

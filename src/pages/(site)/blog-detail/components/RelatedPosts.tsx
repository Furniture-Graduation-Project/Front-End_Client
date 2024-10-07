import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const RelatedPosts = () => {
    return (
        <section className="mb-8">
       <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold">
     You might also like
    </h2>
    <a className="text-gray-600 hover:text-gray-900 flex items-center" href="#">
     More Articles
     <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
    </a>
   </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4">
            <img
              alt="A modern living room with a couch and plants"
              className="w-full mb-4"
              height="300"
              src="https://storage.googleapis.com/a1aa/image/u3SyETn7qvZ3DlQq38epVgIo0Sn8NrJBX93eHUmWfbmPPxInA.jpg"
              width="400"
            />
            <h3 className="text-xl font-bold mb-2">Living Room Ideas</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
             <p className='text-gray-600 mt-2'>October 16, 2023</p>
          </div>
          <div className="border p-4">
            <img
              alt="A modern kitchen with yellow accents"
              className="w-full mb-4"
              height="300"
              src="https://storage.googleapis.com/a1aa/image/nNYbFqE2CK4DKFeQ7NldfYJDi4HZXcg4mqHgN0ePZv6LPxInA.jpg"
              width="400"
            />
            <h3 className="text-xl font-bold mb-2">Kitchen Renovation</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
             <p className='text-gray-600 mt-2'>October 16, 2023</p>
          </div>
          <div className="border p-4">
            <img
              alt="A modern bedroom with a bed and plants"
              className="w-full mb-4"
              height="300"
              src="https://storage.googleapis.com/a1aa/image/r4GebghFLFwcHSmFt3eaKyYj6hc4eFpd3hwL4iXdo5kMPxInA.jpg"
              width="400"
            />
            <h3 className="text-xl font-bold mb-2">Bedroom Makeover</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className='text-gray-600 mt-2'>October 16, 2023</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default RelatedPosts;
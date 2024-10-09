import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const JoinNewsletter = () => {
  return (
      <div className="relative w-full flex items-center justify-center h-96">
        <img 
          src="https://storage.googleapis.com/a1aa/image/HWvYfaQzZfu1jk15sxUmmBKUX0z9Mkk6a0AH4wPerDVuRyInA.jpg" 
          alt="Background image of a white dresser with wooden handles and a gray chair with a white blanket" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Join Our Newsletter</h1>
            <p className="text-gray-600 mb-4 text-center">Sign up for deals, new products and promotions</p>
            <div className="flex items-center border-b border-gray-300 py-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
              <input 
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                type="text" 
                placeholder="Email address" 
                aria-label="Email address" 
              />
              <button 
                className="py-1 px-2 rounded" 
                type="button"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default JoinNewsletter;

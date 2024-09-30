import React from 'react';

const Banner = () => {
  return (
    <div className="relative w-full max-h-[400px] overflow-hidden">
      <img src="/images/img.png" alt="Banner" className="w-full h-auto" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
        <div className="mt-2 text-lg">
          <span className="text-[#605F5F]">Home</span>
          <span className="mx-2 text-[#605F5F]">></span>
          <span className="mx-2 text-black">Blog</span>
        </div>
        <h1 className="mt-6 text-xl md:text-[54px] font-semibold text-black">Our Blog</h1>
        <p className="mt-6 text-md md:text-lg text-black">Home ideas and design inspiration</p>
      </div>
    </div>
  );
};

export default Banner;

import React from 'react';

const DisplayLoad = () => {
  return (
    <section className='bg-neutral-900 mx-auto p-8 grid lg:grid-cols-2 items-start gap-8 m-0'>
      {/* LEFT SIDE */}
      
        {/* LEFT SIDE */}
<div className="flex flex-col space-y-6 lg:w-[960px]">
  {/* Image Block */}
  <div className="relative bg-black h-[530px] rounded overflow-hidden w-full" />

  {/* Thumbnails */}
  <div className="flex items-center justify-center gap-4">
    {[...Array(5)].map((_, idx) => (
      <div key={idx} className="h-[80px] w-[120px] bg-neutral-800 rounded" />
    ))}
  </div>

  {/* Description */}
  <div className="space-y-4 hidden lg:block">
    <div className="h-4 w-40 bg-neutral-700 rounded" />
    <div className="h-4 w-full bg-neutral-800 rounded" />
    <div className="h-4 w-[90%] bg-neutral-800 rounded" />
    <div className="h-4 w-40 bg-neutral-700 rounded mt-6" />
    <div className="h-4 w-[95%] bg-neutral-800 rounded" />
  </div>
</div>


      {/* RIGHT SIDE */}
      <div className="p-6  bg-neutral-800 rounded-2xl shadow-lg text-base lg:text-lg lg:ml-[calc(50%+-5rem)] space-y-6">
        {/* User Avatar & Name */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-600 rounded-full" />
          <div className="h-4 w-24 bg-neutral-700 rounded" />
        </div>

        <div className="h-6 w-2/3 bg-neutral-700 rounded" />

        {/* Price */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-neutral-700 rounded" />
          <div className="flex items-center gap-4">
            <div className="h-10 w-24 bg-green-900 rounded" />
            <div className="h-4 w-16 bg-neutral-600 rounded" />
            <div className="h-4 w-20 bg-green-700 rounded" />
          </div>
        </div>

        {/* Buttons */}
        <div className="h-10 w-full bg-neutral-700 rounded" />

        {/* Supported Formats */}
        <div className="space-y-2">
          <div className="h-4 w-40 bg-neutral-700 rounded" />
          <div className="h-4 w-32 bg-neutral-600 rounded" />
        </div>

        <div className="border-t border-neutral-700 my-4" />

        {/* Why Buy */}
        <div className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-20 h-20 bg-neutral-700 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-neutral-700 rounded" />
                <div className="h-4 w-64 bg-neutral-600 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Products */}
      <div className="col-span-2 mt-20">
        <div className="h-6 w-60 bg-neutral-700 rounded mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="bg-neutral-800 p-4 rounded-xl space-y-4">
              <div className="h-48 bg-neutral-700 rounded" />
              <div className="h-4 w-3/4 bg-neutral-600 rounded" />
              <div className="h-3 w-1/2 bg-neutral-500 rounded" />
              <div className="h-4 w-1/4 bg-green-600 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DisplayLoad;

import React from 'react';
const CardLoading = () => {
  return (
    <div className="w-[340px] h-[290px] flex-shrink-0 bg-[#1c1c1c] border border-[#333] rounded-xl shadow-lg animate-pulse flex flex-col overflow-hidden">
      
      {/* Image placeholder */}
      <div className="h-[180px] w-full bg-[#2a2a2a]" />

      {/* Details */}
      <div className="px-3 py-2 flex flex-col flex-grow justify-between">
        <div className="mb-1 space-y-1">
          <div className="h-4 w-3/4 bg-[#2a2a2a] rounded" />
          <div className="h-3 w-1/2 bg-[#2a2a2a] rounded" />
          <div className="h-3 w-1/3 bg-[#2a2a2a] rounded" />
        </div>

        <div className="flex items-center">
          <div className="h-5 w-12 bg-[#2a2a2a] rounded" />
          <div className="ml-auto h-10 w-10 bg-[#2a2a2a] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CardLoading;

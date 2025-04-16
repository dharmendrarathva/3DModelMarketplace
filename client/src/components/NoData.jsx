import React from 'react'
import b1 from '../assets/b1.png'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
      <img
        src={b1}
        alt='no data'
        className='w-60' 
      />
      <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData
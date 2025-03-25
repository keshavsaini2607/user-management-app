import React from 'react'

export function Loader() {
  return (
    <div className='bg-white h-screen w-screen flex flex-col gap-3 items-center justify-center'>
        <span className="loader"></span>
        <span className='font-bold text-3xl text-gray-500'>Loading</span>
    </div>
  )
}

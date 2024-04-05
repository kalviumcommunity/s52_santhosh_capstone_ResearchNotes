import React from 'react'
import Youtube from './results/Youtube'

function Notes() {
  
  return (
    <div className='h-screen flex items-center justify-center pt-20'>
      {/* <div className='bg-yellow-100 w-4/6 h-full rounded-2xl'>
        
      </div> */}
      <div className='absolute top-10 right-0 overflow-x-scroll w-96 h-screen'>
      <Youtube />

      </div>
    </div>
  )
}

export default Notes

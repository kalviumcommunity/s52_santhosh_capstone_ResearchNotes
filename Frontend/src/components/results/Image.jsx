import React from 'react';
import { useSelector } from "react-redux";


function Image() {

  const { results, query } = useSelector((state) => state.resultData);

  
    // console.log(results.images)

  return (
    <div className='h-full w-full flex overflow-x-scroll'>
    {
      results.images && results.images.length !== 0
        ? results.images.map((image, index) => {
            return (
              <img
                key={index}
                src={image.urls.small}
                alt="query"
                className='h-full max-w-40 object-cover border-2 border-black rounded-md mx-2'
              />
            );
          })
        : Array(5).fill(0).map((_, index) => (
            <div
              key={index}
              className='h-full w-40 object-cover rounded-md mx-2 animate-pulse bg-slate-400'
            />
          ))
    }
  </div>
  )
}


export default Image

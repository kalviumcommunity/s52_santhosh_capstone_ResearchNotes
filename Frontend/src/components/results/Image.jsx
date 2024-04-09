import React from 'react';
import { useSelector } from "react-redux";


function Image() {

  const { results, query } = useSelector((state) => state.resultData);
    // console.log(results.image)

  return (
    <div className='h-full w-full flex p-1'>
      {
          results.image && results.image.length !== 0 && results.image.map((image,index)=>{
           return <img key={index} src={image.urls.small} alt="query" className='h-full max-w-40 object-cover border-2 border-black rounded-md mx-2'  />
          })
      }
    </div>
  )
}


export default Image

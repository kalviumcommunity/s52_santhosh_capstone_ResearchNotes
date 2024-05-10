import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setViewer } from '../../../Redux/Slices/resultSlice';


function Image() {

  const { results, query } = useSelector((state) => state.resultData);
  const dispatch = useDispatch()

  
    const handleView = (index) => {
      dispatch(setViewer({show:true,content:'images',current:index}))
    }

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
                className='h-full max-w-40 object-cover border-2 border-black rounded-md mx-2 cursor-pointer'
                onClick={()=>handleView(index)}
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

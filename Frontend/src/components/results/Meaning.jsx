import React from 'react'
import { useSelector } from "react-redux";



function Meaning() {
    const { results } = useSelector((state) => state.resultData);
    // console.log(results.meaning)
  return (
    results.meaning &&
    <div className='h-full w-full p-1'>
      <p className='text-xs text-center text-gray-500'>Showing results for <span className='font-semibold underline'>{results.meaning.word}</span></p>
      <div className='flex flex-wrap'>
        {
         results.meaning.defs && results.meaning.defs.length !== 0 && results.meaning.defs.map((def,index)=>{
            return(
                <p className='text-xs font-semibold bg-gray-200 m-1 p-1 rounded-full' key={index}>{def}</p>
            )
         })   
        }
      </div>
    </div>
  )
}

export default Meaning

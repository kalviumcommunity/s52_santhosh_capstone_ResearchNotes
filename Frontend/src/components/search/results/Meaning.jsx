import React from 'react'
import { useSelector } from "react-redux";
import { Text } from '@chakra-ui/react';



function Meaning() {
    const { results } = useSelector((state) => state.resultData);
    const { darkMode } = useSelector((state) => state.theme);
    // console.log(results.meaning)
  return (
    results.meaning &&
    <div className='h-full w-full p-1 overflow-y-scroll scroll-hide '>
      <Text fontSize='x-small' className='text-ceter text-gray-500 p-1'>Showing results for <span className='font-semibold underline'>{results.meaning.word ? results.meaning.word : 'no-results'}</span></Text>
      <div className='flex flex-wrap'>
        {
         results.meaning.defs && results.meaning.defs.length !== 0 ? results.meaning.defs.map((def,index)=>{
            return(
                <Text className={`text-xs font-semibold ${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'}  m-1 py-1 px-2 rounded-xl`} 
                key={index}>{def}</Text>
            )
         })   :  
         Array(5).fill(0).map((_,index)=>{
          return(
            <div key={index} className='h-4 w-5/12 m-2 bg-slate-400 rounded-lg animate-pulse'></div>
          )
         })
        }
      </div>
    </div>
  )
}

export default Meaning

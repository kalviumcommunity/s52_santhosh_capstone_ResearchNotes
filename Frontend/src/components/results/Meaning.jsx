import React from 'react'
import { useSelector } from "react-redux";
import { Text } from '@chakra-ui/react';



function Meaning() {
    const { results } = useSelector((state) => state.resultData);
    // console.log(results.meaning)
  return (
    results.meaning &&
    <div className='h-full w-full p-1 overflow-y-scroll'>
      <Text fontSize='x-small' className='text-ceter text-gray-500 p-1'>Showing results for <span className='font-semibold underline'>{results.meaning.word}</span></Text>
      <div className='flex flex-wrap'>
        {
         results.meaning.defs && results.meaning.defs.length !== 0 && results.meaning.defs.map((def,index)=>{
            return(
                <Text className='text-xs font-semibold bg-white m-1 py-1 px-2 rounded-3xl' 
                key={index}>{def}</Text>
            )
         })   
        }
      </div>
    </div>
  )
}

export default Meaning

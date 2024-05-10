import React, { useEffect, useState } from "react";
import { Icon , Tooltip } from '@chakra-ui/react';
import { IoMdSearch } from "react-icons/io";
import { useSelector , useDispatch} from 'react-redux';
import { addQuery } from "../../Redux/Slices/resultSlice";
import Youtube from "./results/Youtube";
import useHandleFetchResults from '../../utlis/helper';
import Meaning from "./results/Meaning";
import Image from "./results/Image";
import Site from "./results/Site";
import useTypewriter from 'react-typewriter-hook';
import '../../App.css'


function Search({setAuthModal,authLoading}) {

  const [search,setSearch] = useState(false)
  const [startType,setStartType] = useState(false)
  
  const dispatch = useDispatch()
  const {isLogged} = useSelector(state=>state.userData)
  const {results,query} = useSelector(state=>state.resultData)
  const {splitMode} = useSelector(state=>state.noteData)
  
  const {fetchVideos,fetchMeaning,fetchImages,fetchSites} = useHandleFetchResults(query)

  const text = "nleash Your Curiosity with ResearchNotes";
  const typedText = useTypewriter(text);
 

const handleChange=(e)=> {
  if(isLogged){
    setStartType(true)
    dispatch(addQuery(e.target.value))
  }else{
    if(!authLoading){
      setAuthModal(true)
    }
  }
} 

const handleSubmit = () => {
  if(query !== ''){                           
    setSearch(true)
    fetchVideos()
    fetchMeaning()
    fetchImages()
    fetchSites()
  }
}

const handleHeight = {
  height : splitMode ? "calc(100vh - 5rem - 18rem - 0.50rem)" : 'calc(100vh - 7.5rem - 18rem)'
}


  return (  
    <div className={`flex ${results.okay ? "" :'flex-col'} items-center justify-center h-full max-w-[1800px] m-auto`}>
      <div className={`${startType || results.okay ? 'absolute top-4 m-auto' : "top-10" } 
      ${splitMode && 'right-1/3'} transition-all duration-300 flex items-center`}>
      <input id="search-bar" className={` border-2  ${results.okay ? 'border-primary' : 'border-black'} h-12 md:w-96 xs:w-80 rounded-full pl-5 pr-16 font-bold focus:outline-none`} type="text" placeholder="Search the entire web..."
      value={query} 
      onChange={handleChange}
      onKeyUp={(e)=>e.key=='Enter' && handleSubmit()}
      />
       <Tooltip label='Search' fontSize='xs' aria-label='A tooltip'>
        <span className="h-fit w-fit -ml-14 ">
      <Icon as={IoMdSearch} onClick={handleSubmit} className='text-4xl cursor-pointer' style={{ color: '#00bbff'}} />
        </span>
       </Tooltip>
      </div>
      
      {
         !results.okay ?
         search ? <div className="loader"></div> : 
      <>
      <h1 className={`font-bold ${splitMode ? 'text-3xl m-5 mt-10' : 'text-5xl m-10'} font-inika text-primary h-12 `}>U{typedText}<span className="font-thin animate-pulse">|</span></h1>
        <p className={`text-center ${splitMode ? 'w-2/3' : 'w-1/3'} font-inika font-bold`}>
        Your go-to destination for comprehensive online research. Find, organize, and share resources effortlessly.</p>
      </> : 
      <>
      <div className={`${splitMode ? 'w-1/2' : 'w-4/6'} h-full  m-1 flex flex-col`}>
        <div className={` ${splitMode ? 'h-40' : 'h-32' } w-full  bg-secondary rounded-md p-1`}>
          <Meaning />
        </div>
        <div className={` ${splitMode ? 'h-32' : 'h-40' } md:p-2 xs:p-4 bg-secondary rounded-md my-1`}>
          <Image />
        </div>
        <div style={handleHeight} className="w-full p-2 bg-secondary rounded-md flex-grow">
            <Site />
        </div>
      </div>
      <div className={`${splitMode ? 'w-1/2' : 'w-1/3'} mr-1 h-full shadow-xl py-2 bg-secondary rounded-md `}>
          <Youtube />
      </div>
      </>
      }
       
    </div>
  );
}

export default Search;  

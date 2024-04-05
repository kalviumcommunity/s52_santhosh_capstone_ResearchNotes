import React, { useEffect, useState } from "react";
import { Icon } from '@chakra-ui/react';
import { IoMdSearch } from "react-icons/io";
import '../App.css'
import { useSelector , useDispatch} from 'react-redux';
import { addQuery } from "../Redux/Slices/resultSlice";


function Search({setAuthModal}) {

  const [search,setSearch] = useState(false)
  const [query,setQuery] = useState('')

  const dispatch = useDispatch()
  const {isLogged} = useSelector(state=>state.userData)
  const {results} = useSelector(state=>state.resultData)

  console.log(results)

useEffect(()=>{
  if(query!==''){
    setSearch(true)
  }
},[query])

const handleChange=(e)=> {
  if(isLogged){
    setQuery(e.target.value)
    dispatch(addQuery(e.target.value))
  }else{
    setAuthModal(true)
  }
}

  return (  
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className={`${search || results.videos ? 'absolute top-4 m-auto' : "top-48" } transition-all duration-300`}>
      <input id="search-bar" className="border-2 border-primary h-12 md:w-96 xs:w-80 rounded-full pl-5 pr-16 font-bold " type="text" placeholder="Search the entire web..."
      value={query} 
      onChange={handleChange}
      />
      <Icon as={IoMdSearch} className='text-4xl -ml-14 cursor-pointer' style={{ color: '#00bbff'}} />
      </div>
      {
         Object.keys(results).length === 0 && <>
      <h1 className="font-bold text-4xl m-10 font-inika">Unleash Your Curiosity with ResearchNotes</h1>
      <p className="text-center w-1/3 font-inika">Your go-to destination for comprehensive online research. Find, organize, and share resources effortlessly.</p>
      </>
    } 
    </div>
  );
}

export default Search;  

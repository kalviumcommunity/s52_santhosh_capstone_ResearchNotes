import React from "react";
import { Icon } from '@chakra-ui/react';
import { IoMdSearch } from "react-icons/io";
import '../App.css'

function Search() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
      <input id="search-bar" className="border-2 border-primary h-12 w-96 rounded-full pl-5" type="text" placeholder="Search the entire web..." />
      <Icon as={IoMdSearch} className='text-4xl -ml-14 cursor-pointer' style={{ color: '#00bbff'}} />
      </div>
      <h1 className="font-bold text-4xl m-10 font-inika">Unleash Your Curiosity with ResearchNotes</h1>
      <p className="text-center w-1/3 font-inika">Your go-to destination for comprehensive online research. Find, organize, and share resources effortlessly.</p>
    </div>
  );
}

export default Search;  

import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import { Icon } from "@chakra-ui/react";
import { TbNotes } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import Notes from "./components/Notes";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import UserAuthModal from "./components/UserAuthModal";
import { useSelector } from "react-redux";

function App() {
    const location = useLocation()
    const [authModal, setAuthModal] = useState(false);
    const userData = useSelector(state=>state.userData)

  return (
    <div className="min-h-screen">
      {/* signup & login modal */}
      <UserAuthModal authModal={authModal} setAuthModal={setAuthModal} />

      <h1 className="font-island text-4xl font-semibold absolute top-4 left-4">
        <span className="text-red-500">R</span>esearch
        <span className="text-red-500">N</span>otes
      </h1>
      <div className="absolute top-4 right-4">
      {
        !userData.isLogged ?
        <button className="font-extrabold text-white bg-primary px-4 py-2 rounded-lg border-2 border-primary font-inika" onClick={()=>setAuthModal(true)}>
        Get started!
      </button> : 
       userData.values.profile !== "" ?
          <img src={userData.values.profile} alt="" className='h-12 w-12 rounded-full object-cover border border-black' /> :
      <div className="h-12 w-12 rounded-full flex items-center justify-center bg-orange-500 font-bold text-white text-3xl cursor-pointer">{userData.values.username[0]}
      </div>
      }
      </div>
      
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>

      <footer className="flex absolute bottom-0 z-10 w-full">
        <div className="w-full flex items-center justify-center p-1 bg-primary rounded-tr-lg border-r-2">
          <Link to="/">
            <Icon
              as={IoMdSearch}
              className="text-4xl cursor-pointer"
              style={{ color: location.pathname==='/' && "red" }}
            />
          </Link>
        </div>
        <div className="w-full flex items-center justify-center p-1  bg-primary rounded-tl-lg border-l-2">
          <Link to='/notes'>
            <Icon
              as={TbNotes}
              className="text-3xl cursor-pointer"
              style={{ color: location.pathname==='/notes' && "red" }}
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default App;

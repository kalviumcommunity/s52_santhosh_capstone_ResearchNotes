import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import { Avatar, Icon, Spinner } from "@chakra-ui/react";
import { TbNotes } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import Notes from "./components/Notes";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import UserAuthModal from "./components/user/UserAuthModal";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { addUserData } from "./Redux/Slices/userSlice";
import { BsArrowRight } from "react-icons/bs";
import Profile from "./components/user/Profile";


function App() {
    const location = useLocation()
    const [authModal, setAuthModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [returnUser, setReturnUser] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    const userData = useSelector(state=>state.userData)
    const dispatch = useDispatch()

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleAuth = () => {
      if(returnUser){
        setAuthLoading(true)
        axios.get(`${BASE_URL}/user-data`, { withCredentials: true })
        .then((res) => {
          dispatch(addUserData(res.data.data)); 
        })
        .catch((err) => {
          setReturnUser(false);
          setAuthModal(true)
        })
        .finally(()=>{
          setAuthLoading(false)
        })
      }else{
        setAuthModal(true)
      }
    }

  return (
    <div className="min-h-screen">
      {/* signup & login modal */}
      <UserAuthModal authModal={authModal} setAuthModal={setAuthModal} />

      {/* profile modal */}
      <Profile profileModal={profileModal} setProfileModal={setProfileModal} />

      <h1 className="font-island text-4xl font-semibold absolute top-4 left-4">
        <span className="text-red-500">R</span>esearch
        <span className="text-red-500">N</span>otes
      </h1>
      <div className="absolute top-4 right-4">
      {
        !userData.isLogged ?
        <button 
        className={`font-extrabold text-white bg-primary px-4 py-2 rounded-lg border-2 border-primary font-inika flex justify-center items-center ${authLoading && "cursor-not-allowed"}`}
        onClick={handleAuth}
        disabled={authLoading}
        >
        Get started 
        <div className="ml-2 flex justify-center items-center">
        {
           authLoading ?
           <Spinner size='sm' /> :
          <BsArrowRight />  
        }
        </div>
      </button> : 
       userData.values.profile !== "" ?
          <img src={userData.values.profile} 
           className='h-12 w-12 rounded-full object-cover border border-black cursor-pointer'
           onClick={()=>setProfileModal(true)}
           /> :
      <div className="h-12 w-12 cursor-pointer"
      onClick={()=>setProfileModal(true)}
      >
        <Avatar size='md' bg='tomato' name={userData.values.username} />
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

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
import './App.css'
import Editor from "./components/Editor";
import { PiSquareSplitHorizontal } from "react-icons/pi";
import { changeMode } from "./Redux/Slices/noteSlice";


function App() {
    const location = useLocation()
    const [authModal, setAuthModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [returnUser, setReturnUser] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    const userData = useSelector(state=>state.userData)
    const {results} = useSelector(state=>state.resultData)
    const { currentNote, splitMode } = useSelector((state) => state.noteData)

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

    const handleSplit = () => {
      dispatch(changeMode(!splitMode))
    }

   const handleHeight = {
        height : splitMode ? "calc(100vh - 5rem)" : 'calc(100vh - 7.5rem)'
    }

  return (
    <div className="h-screen">
      {/* signup & login modal */}
      <UserAuthModal authModal={authModal} setAuthModal={setAuthModal} />

      {/* profile modal */}
      <Profile profileModal={profileModal} setProfileModal={setProfileModal} />

     <nav className="w-full flex justify-between items-center h-20 px-4 font-bold">
      <h1 className="font-island text-4xl font-semibold text-gray-800">
        <span className="text-primary font-semibold">R</span>esearch
        <span className="text-primary font-semibold">N</span>otes
      </h1> 
      <div>
      {
        !userData.isLogged ?
        <button 
        className={`font-extrabold text-white bg-primary px-4 py-2 rounded-lg border-2 border-primary font-inika flex justify-center items-center ${authLoading && "cursor-not-allowed"}`}
        onClick={handleAuth}
        disabled={authLoading}
        >
        Get started 
        <span className="ml-2 flex justify-center items-center">
        {
           authLoading ?
           <Spinner size='sm' /> :
           <BsArrowRight />  
        }
        </span>
      </button> : 
       userData.values.profile !== "" ?
       <div className="flex justify-center items-center">
          {
            currentNote && Object.keys(currentNote).length !== 0 && results.okay  && <PiSquareSplitHorizontal className="text-4xl font-bold text-primary mx-4 cursor-pointer shadow-2xl shadow-black"
            onClick={handleSplit}
             /> 
          }
         <img src={userData.values.profile} 
         className='h-12 w-12 rounded-full object-cover border-3 border-red-500 cursor-pointer'
         onClick={()=>setProfileModal(true)}
         /> 
       </div> :
       <Avatar size='md' bg='tomato' name={userData.values.username} cursor='pointer' onClick={()=>setProfileModal(true)} />
      }
      </div>
      </nav>

        {
          splitMode ?
          (
            <div style={handleHeight}  className="flex" >
              <div className="h-full w-3/6 flex-1">
                <Search setAuthModal={setAuthModal} />
              </div>
              <div className="h-full w-3/6 flex-2">
                <Editor />
              </div>
            </div>
          ) : (
      <div style={handleHeight}>
        <Routes>
          <Route path="*" element={<Search setAuthModal={setAuthModal} />} />
          <Route path="/notes" element={<Notes authLoading={authLoading} handleAuth={handleAuth} />} />
          <Route path="/notes/:id" element={<Editor />} />
        </Routes>
      </div>
          )
        }
        {
       !splitMode && (
          <footer className="flex fixed bottom-0 z-10 w-full h-10">
        <div className="w-full flex items-center justify-center bg-primary rounded-tr-lg border-r-2">
          <Link to="/search">
            <Icon
              as={IoMdSearch}
              className="text-4xl cursor-pointer"
              style={{ color: location.pathname==='/' && "red" }}
            />
          </Link>
        </div>
        <div className="w-full flex items-center justify-center p-1  bg-primary rounded-tl-lg border-l-2">
          <Link  to={ currentNote && Object.keys(currentNote).length !== 0 ? `/notes/${currentNote._id}` : '/notes'}>
            <Icon
              as={TbNotes}
              className="text-3xl cursor-pointer"
              style={{ color: location.pathname.startsWith('/notes') && "red" }}
            />
          </Link>
        </div>
      </footer>
       )
      }
    </div>
  );
}

export default App;

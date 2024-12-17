import React, { useState, useEffect } from "react";
import Search from "./components/search/Search";
import { Avatar, Icon, Spinner, Tooltip, Button } from "@chakra-ui/react";
import { TbNotes } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import Notes from "./components/note/Notes";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import UserAuthModal from "./components/user/UserAuthModal";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { addUserData } from "./Redux/Slices/userSlice";
import { BsArrowRight } from "react-icons/bs";
import Profile from "./components/user/Profile";
import './App.css'
import Editor from "./components/note/Editor";
import { PiSquareSplitHorizontalLight } from "react-icons/pi";
import { changeSplitMode } from "./Redux/Slices/noteSlice";
import Viewer from "./components/search/Viewer";
import { CiLight, CiDark } from "react-icons/ci";
import { changeTheme } from "./Redux/Slices/themeSlice";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';



function App() {
    const location = useLocation()
    const [authModal, setAuthModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [returnUser, setReturnUser] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    const userData = useSelector(state=>state.userData)
    const {viewer} = useSelector(state=>state.resultData)
    const { currentNote, splitMode } = useSelector((state) => state.noteData)
    const {darkMode} = useSelector((state)=>state.theme)
    

    const dispatch = useDispatch()

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleAuth = () => {
      // console.log(Cookies.get('accessToken'))
      if(returnUser){
        setAuthLoading(true)
        axios.get(`${BASE_URL}/user-data`, {
          headers: {
              Authorization: Cookies.get('accessToken') || "no-token"
          }
      }).then((res) => {
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

    useEffect(()=>{
      handleAuth()
    },[])

    const handleSplit = () => {
        dispatch(changeSplitMode(!splitMode))
    }

   const handleHeight = {
        height : splitMode ? "calc(100vh - 5rem)" : 'calc(100vh - 7.5rem)'
    }

    useEffect(() => {
        if (viewer?.show==true){
          setViewModal(true)
        }else{
          setViewModal(false)
        }
    },[viewer])


    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="h-[100vh] w-full">
          <h1 className={"font-island text-4xl"} style={{fontWeight:'bold'}}>
            <span className="text-primary font-semibold">R</span>esearch
            <span className="text-primary font-semibold">N</span>otes
          </h1> 
          <div className="h-5/6 flex flex-col items-center justify-center">
              <h1 className="text-3xl">⚠️</h1>
              <h1 className ="font-bold text-xs m-4">Please switch to laptop or desktop to access the site.</h1>
              {/* <Button colorScheme='blue' onClick={() => { setProfileModal(false), handleLogout() }}>
              
            </Button> */}
          </div>
      </div>
    );
  }



    
  return (
    <div className={`${darkMode && 'bg-secondary'}`}>
    <div className="bg"></div>
    <div className='top-0 h-screen w-full transition-all duration-500'>
       <Toaster />
      {/* signup & login modal */}{
        authModal &&
      <UserAuthModal authModal={authModal} setAuthModal={setAuthModal} />
      }

      {/* zoom view modal */}{
        viewModal && 
      <Viewer viewModal={viewModal} setViewModal={setViewModal}/>
      }

      {/* profile modal */}{
        profileModal && 
      <Profile profileModal={profileModal} setProfileModal={setProfileModal} setAuthModal={setAuthModal} />
      }

     <nav className="w-full flex justify-between items-center h-20 px-4 font-bold z-20">
      <h1 className={`font-island text-4xl ${darkMode ? 'text-white' : 'text-black'}`} style={{fontWeight:'bold'}}>
        <span className="text-primary font-semibold">R</span>esearch
        <span className="text-primary font-semibold">N</span>otes
      </h1> 
      <div className="flex place-items-center">
        <div>
        {
          darkMode ? 
          <CiLight 
          className="text-white text-4xl mx-3 cursor-pointer hover:bg-gray-900 rounded-lg p-1" 
          onClick={()=>dispatch(changeTheme())}
          /> :
          <CiDark 
          className="text-black text-4xl font-bold mx-3 cursor-pointer hover:bg-gray-300 rounded-lg p-1"
          onClick={()=>dispatch(changeTheme())}
          />
        }
        </div>
      {
        !userData.isLogged ?
        <button 
        className={`font-extrabold text-white bg-primary px-4 py-2 rounded-lg border-2 border-primary font-inika flex justify-center items-center ${authLoading && "cursor-not-allowed select-none"}`}
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
       userData?.values?.profile !== "" ?
       <div className="flex justify-center items-center">
          {
            <Tooltip  label='Split Mode' fontSize='xs'>
              <div className="w-fit h-fit mr-4">
                <PiSquareSplitHorizontalLight className={`text-4xl shadow-2xl shadow-black  ${splitMode ? 'text-primary' : 'text-gray-400'} cursor-pointer`}
                onClick={handleSplit}
                /> 
              </div>
            </Tooltip>
          }
          <Tooltip  label='profile' fontSize='xs'>
            <div className="h-fit w-fit rounded-full border border-white">
         <img
         src={userData?.values?.profile} 
         className='h-11 w-11 rounded-full object-cover cursor-pointer select-none'
         onClick={()=>setProfileModal(true)}
         /> 
            </div>
         </Tooltip>
       </div> :
       <Avatar size='md' bg='tomato' name={userData?.values?.username} cursor='pointer' onClick={()=>setProfileModal(true)} />
      }
      </div>
      </nav>
        {
          splitMode ?
          (
            <div style={handleHeight}  className="flex" >
                <div className="h-full w-3/6 resize-x overflow-auto resizable-area cursor-default min-w-[50vw] ">
                  <Search setAuthModal={setAuthModal} authLoading={authLoading} />
                </div>
                <div
                className="h-full flex-grow"
                  >
                    {
                      currentNote && Object.keys(currentNote).length === 0 ?
                      <Notes authLoading={authLoading} handleAuth={handleAuth} /> :
                      <Editor />
                    }
                </div>  
            </div>
          ) : (
      <div style={handleHeight}>
        <Routes>
          <Route path="*" element={<Search setAuthModal={setAuthModal} authLoading={authLoading} />} />
          <Route path="/notes" element={<Notes authLoading={authLoading} handleAuth={handleAuth} />} />
          <Route path="/notes/:id" element={<Editor/>} />
        </Routes>
      </div>
          )
        }
        {
       !splitMode && (
          <footer className="flex fixed bottom-0 z-10 w-full h-10 text-gray-600">
        <div className="w-full flex items-center justify-center bg-primary rounded-tr-lg mr-[1px]">
          <Link to="/search">
          <Tooltip label='Search' fontSize='xs'>
          <div className="h-fit w-fit"> 
            <Icon
              as={IoMdSearch}
              className="text-4xl cursor-pointer"
              style={{ color: location.pathname==='/' || location.pathname==='/search' ? "black" : '' }}
            />
            </div>  
            </Tooltip>
          </Link>
        </div>
        <div className="w-full flex items-center justify-center p-1  bg-primary rounded-tl-lg ml-[1px]">
          <Link  to={ currentNote && Object.keys(currentNote).length !== 0 ? `/notes/${currentNote._id}` : '/notes'}>
         <Tooltip label='Notes' fontSize='xs'>
          <div className="h-fit w-fit">
             <Icon
              as={TbNotes}
              className="text-3xl cursor-pointer"
              style={{ color: location.pathname.startsWith('/notes') && "black" }}
            />
          </div>
          </Tooltip>
          </Link>
        </div>
      </footer>
       )
      }
    </div>
    </div>
  );
}

export default App;

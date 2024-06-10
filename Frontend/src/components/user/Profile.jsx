import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button
  } from '@chakra-ui/react'
import UserAvatar from './UserAvatar';
import { useSelector , useDispatch} from 'react-redux';
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../../Redux/Slices/userSlice';
import { resetResults } from '../../Redux/Slices/resultSlice';
import { resetNotes } from '../../Redux/Slices/noteSlice';
import toast from 'react-hot-toast';



function Profile({profileModal,setProfileModal}) {
    const userData = useSelector(state=>state.userData)
    const {darkMode} = useSelector(state=>state.theme)

  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const BASE_URL = import.meta.env.VITE_BASE_URL;

const handleLogout = () => {
    axios.get(`${BASE_URL}/logout`,{
      withCredentials:true
    })
    .then((res)=>{
      navigate('/')
      dispatch(resetUser())
      dispatch(resetNotes())
      dispatch(resetResults())
      setProfileModal(false)
    })
    .catch((err)=>{
      toast.error(err.message)
    })
}

  return (
    <div >
       <Drawer
        isOpen={profileModal}
        placement='right'
        onClose={()=>setProfileModal(false)}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent bg={darkMode ? '#1a2125' : 'white'}>
          <DrawerCloseButton color="red" size="lg" zIndex={20} />
          <DrawerHeader>
          <h1 className='text-primary font-bold my-2 text-2xl'>Profile</h1>
          </DrawerHeader>

          <DrawerBody>
            <img  
             style={{ border: darkMode ? '2px solid white' : '2px solid black' }}
            className={`h-32 w-32 m-auto rounded-full`}  src={userData?.values?.profile} alt={userData?.values?.username}  />
          </DrawerBody>
 
          <DrawerFooter>
            <Button rightIcon={<MdLogout />} colorScheme='red' onClick={handleLogout}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Profile

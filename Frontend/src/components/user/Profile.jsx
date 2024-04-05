import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useToast,
    Button
  } from '@chakra-ui/react'
import UserAvatar from './UserAvatar';
import { useSelector , useDispatch} from 'react-redux';
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import { deleteUserData } from '../../Redux/Slices/userSlice';


function Profile({profileModal,setProfileModal}) {
    const userData = useSelector(state=>state.userData)

    const toast = useToast()
    const dispatch = useDispatch()

    const BASE_URL = import.meta.env.VITE_BASE_URL;

const handleLogout = () => {
    axios.get(`${BASE_URL}/logout`,{
      withCredentials:true
    })
    .then((res)=>{
      dispatch(deleteUserData())
      setProfileModal(false)
    })
    .catch((err)=>{
      console.log(err)
      toast({
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    })
}

  return (
    <div>
       <Drawer
        isOpen={profileModal}
        placement='right'
        onClose={()=>setProfileModal(false)}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="red" size="lg" zIndex={20} />
          <DrawerHeader>
          <h1 className='text-primary font-bold my-2 text-2xl'>Profile</h1>
          </DrawerHeader>

          <DrawerBody>
            <div className='h-32 w-32 m-auto'>
            <UserAvatar avatar={userData.values.profile} userName={userData.values.username}  />
            </div>
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

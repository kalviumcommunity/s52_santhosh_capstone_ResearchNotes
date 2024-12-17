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
import { useSelector } from 'react-redux';
import { MdLogout } from "react-icons/md";
import Logout from '../../utlis/logout';
import { formatDistanceToNow } from "date-fns";
import { MdOutlineEdit } from "react-icons/md";
import {Tooltip} from "@chakra-ui/react";




function Profile({ profileModal, setProfileModal, setAuthModal }) {
  const userData = useSelector(state => state.userData)
  const { collection } = useSelector(state => state.noteData)
  const { darkMode } = useSelector(state => state.theme)

  const { handleLogout } = Logout();

  const handleUpdate = () => {
    // setAuthModal(true);
    // setProfileModal(false);
  }

  // console.log(userData?.values?.profile);
  return (
    <div >
      <Drawer
        isOpen={profileModal}
        placement='right'
        onClose={() => setProfileModal(false)}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent bg={darkMode ? '#1a2125' : 'white'}>
          <DrawerCloseButton color="red" size="lg" zIndex={20} />
          <DrawerHeader>
            <h1 className='text-primary font-bold my-2 text-2xl'>Profile</h1>
          </DrawerHeader>

          <DrawerBody>
            <div className='relative w-3/6 m-auto'>
              <div className='absolute top-2 right-2' onClick={handleUpdate}>
                <Tooltip label="edit profile" fontSize="xs">
                  <div>
                    <MdOutlineEdit className="mr-2 text-green-600 text-lg cursor-pointer" />
                  </div>
                </Tooltip>
              </div>
              <img
                style={{ border: darkMode ? '2px solid white' : '2px solid black' }}
                className='h-32 w-32 m-auto rounded-full'
                src={userData?.values?.profile} alt={userData?.values?.username} />
            </div>

            <div className="flex justify-center mt-10">
              <table className="text-gray-500 text-sm">
                <tbody>
                  <tr>
                    <td className="pr-4 font-medium">Username</td>
                    <td className="font-normal">: {userData.values.username}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 font-medium">Email</td>
                    <td className="font-normal">: {userData.values.email}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 font-medium">Last updated</td>
                    <td className="font-normal">: {userData?.values?.updatedAt ? formatDistanceToNow(new Date(userData?.values?.updatedAt), {
                      addSuffix: true,
                    }) : "just now"}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 font-medium">Total No. of Notes</td>
                    <td className="font-normal">: {collection?.length-1 >= 1 ?  collection?.length-1 : 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button rightIcon={<MdLogout />} colorScheme='red' onClick={() => { setProfileModal(false), handleLogout() }}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Profile

import React from 'react';
import { PiUploadSimpleBold} from "react-icons/pi";
import {Avatar, Icon} from '@chakra-ui/react'


function UserAvatar({avatar,handleAvatarChange,userName}) {

  return (
    <div className="h-full w-full rounded-full relative border border-black">

        {
           avatar ?
                <img
                  src={avatar}
                  alt="user avatar"
                  className="w-full h-full object-cover rounded-full opacity-100 hover:opacity-50"
                /> :
                <Avatar height='full' width='full' size='2xl' name={userName} />
        }

                <label
                  htmlFor="avatar-input"
                  className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}
                >
                  <Icon
                    as={PiUploadSimpleBold}
                    className="text-2xl cursor-pointer"
                    style={{ color: "white" }}
                  />
                  <p className="text-white font-extrabold text-xs text-shadow-2xl text-shadow-red-500">
                    change avatar
                  </p>
                </label>
                <input
                  type="file"
                  id="avatar-input" 
                  onChange={handleAvatarChange}
                  className="hidden"
                  accept="image/*"
                  />
                </div>
  )
}

export default UserAvatar

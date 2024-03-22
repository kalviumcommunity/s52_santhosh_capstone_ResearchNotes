import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Icon } from "@chakra-ui/react";
import {useForm} from 'react-hook-form'
import OtpAuthModal from './OtpAuthModal';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { PiUploadSimpleBold } from "react-icons/pi";


const UserAuthModal = ({authModal,setAuthModal}) => {
  const [signUpPage,setSignUpPage] = useState(false);
  const [otpPage,setOtpPage] = useState(false);
  const [userData,setUserData] = useState({})
  const [token,setToken] = useState('')
  const [avatar, setAvatar] = useState("");
  const [avatarURL,setAvatarURL] = useState('');

  const {register, handleSubmit, formState: { errors}, watch, setError} = useForm();

const BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const toast = useToast()

const avatarUpload= async ()=>{
  if(avatar){
    const formData = new FormData()
    formData.append('file',avatar)
    formData.append('upload_preset','ynhhgkqu')
    await axios.post(VITE_CLOUDINARY_URL, formData)
    .then((res) => {setAvatarURL(res.data.secure_url),console.log(res)})
    .catch((err) => {
      console.log(err)
      toast({
        description: err.response.data.error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    })
  
  }

}

const onSubmit = async (data) => {
    setUserData(data)
    if(avatar){
      await avatarUpload();
    }

    if(signUpPage){
      axios.post(`${BASE_URL}/signup`,{
        username:data.username,
        email:data.email,
        password:data.password,
        profile:avatarURL ? avatarURL : "",
      },{                         
        withCredentials:true
      })
      .then((res)=>{setToken(res.data.token),setOtpPage(true)})
      .catch((err)=>{
        // console.log(err)
          if(err.response.status==409)  setError('email', { message: err.response.data.error });
          toast({
            description: err.response.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
      })
    }else{
      axios.post(`${BASE_URL}/login`,{
        email:data.email,
        password:data.password,
      },{
        withCredentials:true
      })
      .then((res)=>{
        console.log(res.data)
        toast({
            description:res.data.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        })
        setAuthModal(false)
    })
      .catch((err)=>{
        console.log(err)
        if(err.response.status==401)  setError('email', { message: err.response.data.error });
        if(err.response.status==403)  setError('password', { message: err.response.data.error });
        toast({
          description: err.response.data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      })
    }
}

  return (
    <>
      <Modal isOpen={authModal} onClose={()=>setAuthModal(false)} size='lg' closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color='red'/>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {
              otpPage ?  <OtpAuthModal userData={userData} token={token} setOtpPage={setOtpPage} setAuthModal={setAuthModal} avatar={avatar} /> : (

          <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col justify-center mx-4 ${!signUpPage && "pt-10 p-1"}`}> 
            
            {
              signUpPage && 
              <div className='flex justify-between'>
                <div className="mt-5 font-serif w-4/6">
                  <label htmlFor="username" className="block">Username</label>
                  <input type='username' id="username" className={`bg-transparent border ${errors.username ? 'border-red-500' : 'border-gray-400'} h-10 w-full rounded-sm pl-2`} placeholder='santhosh' {...register('username',{required:"username required"})} />
                  <p className="text-red-500 font-itim text-sm">{errors.username?.message}</p>
                </div>

                <div className="h-28 w-28 rounded-full m-4 relative">
                <img
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                  }
                  alt="user avatar"
                  className="w-full h-full object-cover rounded-full opacity-100 hover:opacity-50"
                />

                <label
                  htmlFor="avatar-input"
                  className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{backgroundColor:'rgba(0, 0, 0, 0.6)'}}
                >
                  <Icon
                    as={PiUploadSimpleBold}
                    className="text-2xl cursor-pointer"
                    style={{ color: "white" }}
                  />
                  <p className="text-white font-extrabold text-xs font-serif text-shadow-2xl text-shadow-red-500">
                    upload avatar
                  </p>
                </label>
                <input
                  type="file"
                  id="avatar-input"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="hidden"
                  />
                </div>
              </div>
                        }

            <div className="-mt-7 font-serif">
              <label htmlFor="email" className="block">Email address</label>
              <input type='email' id="email" className={`bg-transparent border ${errors.email ? 'border-red-500' : 'border-gray-400'} h-10 w-full rounded-sm pl-2`} placeholder='example@domain.com' {...register('email',{required:"mail id required"})} />
              <p className="text-red-500 font-itim text-sm">{errors.email?.message}</p>
            </div>

            <div className="mt-3 font-serif">
              <label htmlFor="password" className="block">Password</label>
              <input type="text" id="password" className={`bg-transparent border ${errors.password ? 'border-red-500' : 'border-gray-400'} h-10 w-full rounded-sm font-thin pl-2`} placeholder="example123#" {...register('password',{required:'password is required',minLength:{
                value:5,
                message:'password should be greater than 5 characters'
                },
                maxLength:{
                value:10,
                message:'password should be lesser than 10 characters'
                }})}/>
              <p className="text-red-500 font-itim text-sm">{errors.password?.message}</p>
            </div>
            
            {
              signUpPage && 
            <div className="mt-3 font-serif">
              <label htmlFor="repeat-password" className="block">Repeat Password</label>
              <input type="text" id="repeat-password" className={`bg-transparent border ${errors.repeatPassword ? 'border-red-500' : 'border-gray-400'} h-10 w-full rounded-sm font-thin pl-2`} placeholder="example123#" {...register("repeatPassword", {
                required: "Please repeat the password",
                validate: (value) =>
                value === watch('password') || "Password does not match",
                })} />
              <p className="text-red-500 font-itim text-sm">{errors.repeatPassword?.message}</p>
            </div>
            }

            <button type="submit" className="bg-primary text-gray-700 font-bold w-full h-10 mt-3 rounded-3xl">{signUpPage ? 'GET OTP' : 'LOG IN'}
            </button>
            
            <div className=' flex flex-col justify-center items-center'>
              <div className="w-full flex justify-center items-center text-black">
                <hr className="w-2/6 border-gray-500" />
                <h1 className="m-2">or</h1>
                <hr className="w-2/6 border-gray-500" />
              </div>
              
              <div className="xs:w-4/6 h-10 border border-gray-400 flex items-center rounded-3xl cursor-pointer mb-6">
                <img width="32" height="32" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" className="md:mx-5 xs:mx-2"/>
                <h1 className="font-sans md:font-bold xs:font:semibold">Login with Google</h1>
              </div>

              <p className="text-gray-600 font-semibold absolute bottom-1 text-xs">{signUpPage ? 'Already have an account?' : "Don't have an account?"} 
                <span className="text-primary underline cursor-pointer" onClick={()=>setSignUpPage(!signUpPage)}> {signUpPage ? 'Log in here' : 'Sign up here'}
                </span>
              </p>
            </div>

            </form>
            )
          }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserAuthModal;

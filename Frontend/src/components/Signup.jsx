import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useToast,Icon } from '@chakra-ui/react'
import { PiUploadSimpleBold} from "react-icons/pi";
import { useState } from 'react';


const Signup = ({setOtpPage,setSignupInfo}) => {

  const {register, handleSubmit, formState: { errors}, watch, setError} = useForm();
  const [avatar, setAvatar] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;

    const toast = useToast()
    
    const onSubmit = async (data) => {

      axios.post(`${BASE_URL}/signup`, {
        username: data.username,
        email : data.email,
        password: data.password,
      }, {
        withCredentials: true,
      })
      .then((res) => {
        setSignupInfo({ ...data, avatar, token: res.data.token });
        setOtpPage(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setError('email', { message: err.response.data.error });
        }
    
        toast({
          description: err.response.data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        });
      });
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col justify-center mx-4`}> 
            
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
                  style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}
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
          
            <div className="mt-3 font-serif">
              <label htmlFor="repeat-password" className="block">Repeat Password</label>
              <input type="text" id="repeat-password" className={`bg-transparent border ${errors.repeatPassword ? 'border-red-500' : 'border-gray-400'} h-10 w-full rounded-sm font-thin pl-2`} placeholder="example123#" {...register("repeatPassword", {
                required: "Please repeat the password",
                validate: (value) =>
                value === watch('password') || "Password does not match",
                })} />
              <p className="text-red-500 font-itim text-sm">{errors.repeatPassword?.message}</p>
            </div>
        

            <button type="submit" className="bg-primary text-gray-700 font-bold w-full h-10 mt-3 rounded-3xl">
                GET OTP
            </button>
            
          

            </form>
    )
}

export default Signup;
import {useForm} from 'react-hook-form'
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addUserData } from '../../Redux/Slices/userSlice';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from "./UserAuthModal";

const Login = () => {

  const { setAuthModal, setTempUserInfo, setloading,setPage} = useContext(AuthContext);

    const [forgotPassword,setForgotPassword] = useState(false)
    const {register, handleSubmit, formState: { errors}, watch, setError} = useForm();
    const toast = useToast()
    const dispatch = useDispatch()
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const onSubmit = (data) => {
      setloading(true)
      if(forgotPassword){
        axios.post(`${BASE_URL}/request-otp`,{email:data.email})
        .then((res)=>{
          setTempUserInfo({...res.data,type:'login',email:data.email})
          setPage('otp')
        })
        .catch((err)=>{ 
          console.log(err)
          toast({
            description: err.response.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        })
        .finally(()=>{
          setloading(false)
        }) 
      }else{
        axios.post(`${BASE_URL}/login`,{
            email:data.email,
            password:data.password,
          },{
            withCredentials:true
          })
          .then((res)=>{
            // console.log(res.data)
            dispatch(addUserData(res.data.data))
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
            // console.log(err)
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
          .finally(()=>{
            setloading(false)
          }) 
        }
    }

    
  return (
    <form
      className={`flex flex-col justify-center mx-4 mt-10`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="-mt-7 font-serif">
        <label htmlFor="email" className="block">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className={`bg-transparent border ${
            errors.email ? "border-red-500" : "border-gray-400"
          } h-10 w-full rounded-sm pl-2`}
          placeholder="example@domain.com"
          {...register("email", { required: "mail id required" })}
        />
        <p className="text-red-500 font-itim text-sm">
          {errors.email?.message}
        </p>
      </div>

        {
          !forgotPassword &&  
      <div className="mt-3 font-serif">
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          type="text"
          id="password"
          className={`bg-transparent border ${
            errors.password ? "border-red-500" : "border-gray-400"
          } h-10 w-full rounded-sm font-thin pl-2`}
          placeholder="example123#"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "password should be greater than 5 characters",
            },
            maxLength: {
              value: 10,
              message: "password should be lesser than 10 characters",
            },
          })}
        />
        <p className="text-red-500 font-itim text-sm">
          {errors.password?.message}
        </p>
        <p className='text-primary underline cursor-pointer w-fit' onClick={()=>setForgotPassword(true)}>{errors.password?.message === 'Incorrect password' && !errors.email && 'Forgot password'}</p>
      </div>
        }

      <button
        type='submit'
        className="bg-primary text-gray-700 font-bold w-full h-10 mt-3 rounded-3xl"
        // onClick={(e) => {
        //   e.preventDefault();
        //   forgotPassword ? handleForgotPassword() : handleSubmit(onSubmit)();
        // }}
      >
        {forgotPassword ? "Request OTP" : "LOG IN" }
      </button>
    </form>
  );
};

export default Login
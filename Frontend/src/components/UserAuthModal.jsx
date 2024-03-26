import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Progress
} from "@chakra-ui/react";
import Otp from "./Otp";
import Signup from "./Signup";
import Login from "./Login";
import { signInWithPopup } from "firebase/auth"
import {auth,provider} from '../google/config'
import {useDispatch} from 'react-redux'
import { addUserData } from "../Redux/Slices/userSlice";



const UserAuthModal = ({ authModal, setAuthModal }) => {
  const [loginPage, setLoginPage] = useState(true);
  const [otpPage,setOtpPage] = useState(false);
  const [signupInfo, setSignupInfo] = useState({});
  const [loading, setloading] = useState(false)

  const dispatch = useDispatch();
  const toast = useToast();


  const handleGoogleSignIn = () => {
    setloading(true)
    signInWithPopup(auth, provider)
    .then((result)=>{
      console.log(result)
      dispatch(addUserData({
        username:result.user.displayName,
        email:result.user.email,
        profile:result.user.photoURL,
      }))
      toast({
        description:'logged in successfully',
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setAuthModal(false)
    }).catch((err)=>{
      toast({
        description:err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error(err.message)
    })
    .finally(()=>{
      setloading(false)
    })
    
  };

  return (
    <>
      <Modal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        size="lg"
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="red" size='lg' zIndex={20} />
          <ModalHeader>
          </ModalHeader>
          <ModalBody>
            {
              loading && <div className="absolute inset-0 z-10 rounded-md" style={{backgroundColor:'#00000050'}}>
              </div>
            }
            {
            loginPage ? (
              <Login setAuthModal={setAuthModal} setloading={setloading} /> 
            ) : (
                otpPage ? (
                  <Otp signupInfo={signupInfo} setAuthModal={setAuthModal} setOtpPage={setOtpPage} setloading={setloading}/>
                ) : (
                  <Signup setOtpPage={setOtpPage} setSignupInfo={setSignupInfo} setloading={setloading} />
                )
            )
            }
            {
                !otpPage && <>
            
            <div className=" flex flex-col justify-center items-center">
              <div className="w-full flex justify-center items-center text-black">
                <hr className="w-2/6 border-gray-500" />
                <h1 className="m-2">or</h1>
                <hr className="w-2/6 border-gray-500" />
              </div>

              <div className="xs:w-4/6 h-10 border border-gray-400 flex items-center rounded-3xl cursor-pointer mb-6" 
              onClick={handleGoogleSignIn}
              >
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/fluency/48/google-logo.png"
                  alt="google-logo"
                  className="md:mx-5 xs:mx-2"
                />
                <h1 className="font-sans md:font-bold xs:font:semibold">
                  Login with Google
                </h1>
              </div>

              <p className="text-gray-600 font-semibold absolute bottom-3 text-xs">
                {loginPage
                  ? "Don't have an account?"
                  : "Already have an account?" }
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setLoginPage(!loginPage)}
                >
                  {loginPage ? " Sign up here" : " Log in here"}
                </span>
              </p>
            </div>
            </>
            }
          </ModalBody>
          <div className="h-2">
          { 
          loading &&
            <Progress value={100} height='8px' isIndeterminate zIndex={20} /> 
          }
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserAuthModal;

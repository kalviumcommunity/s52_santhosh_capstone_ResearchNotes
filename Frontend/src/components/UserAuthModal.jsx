import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Otp from "./Otp";
import Signup from "./Signup";
import Login from "./Login";

const UserAuthModal = ({ authModal, setAuthModal }) => {
  const [loginPage, setLoginPage] = useState(true);
  const [otpPage,setOtpPage] = useState(false);
  const [signupInfo, setSignupInfo] = useState({});

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
          <ModalCloseButton color="red" />
          <ModalHeader></ModalHeader>
          <ModalBody>
            {
            loginPage ? (
              <Login setAuthModal={setAuthModal} /> 
            ) : (
                otpPage ? (
                  <Otp signupInfo={signupInfo} setAuthModal={setAuthModal} setOtpPage={setOtpPage} />
                ) : (
                  <Signup setOtpPage={setOtpPage} setSignupInfo={setSignupInfo} />
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

              <div className="xs:w-4/6 h-10 border border-gray-400 flex items-center rounded-3xl cursor-pointer mb-6">
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

              <p className="text-gray-600 font-semibold absolute bottom-1 text-xs">
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserAuthModal;

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Icon,useToast } from "@chakra-ui/react";

function OtpAuthModal({ userData, token, setOtpPage, setAuthModal, avatar }) {
  const [otp, setotp] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
 
  
  const toast = useToast();

  function handleSubmit() {
    axios
      .post(
        `${BASE_URL}/validate-user`,
        {
          submittedOTP: otp,
          token: token,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast({
          description: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setAuthModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          description: err.response.data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-10">
        <div className="h-36 w-36 rounded-full m-4 relative">
          <img
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            }
            alt="user avatar"
            className="w-full h-full object-cover rounded-full opacity-100 hover:opacity-50"
          />
        </div>
        <h1 className="text-center font-serif text-2xl">
          Hello <span className="font-semibold">{userData.username}</span>
        </h1>
      </div>

      <p>Please check your email to get OTP. We've just sent it to an</p>
      <h1 className="text-red-500 text-sm">{userData.email}</h1>

      <input
        className="h-10 w-4/6 rounded-sm border border-gray-700 mt-5 text-primary font-bold font-serif text-center text-2xl"
        type="number"
        placeholder="enter your otp"
        onChange={(e) => setotp(e.target.value)}
        value={otp}
      />
      <p className="text-red-500 font-itim text-sm">
        *otp only valid for 5 minutes
      </p>
      <div className="w-full flex gap-2">
        <button
          className="border-2 border-primary text-gray-700 font-bold w-2/6 h-10 mt-3 rounded-xl"
          onClick={() => setOtpPage(false)}
        >
          Back
        </button>
        <button
          className={`bg-primary text-gray-700 font-bold w-4/6 h-10 mt-3 rounded-xl ${
            otp === "" && "cursor-not-allowed"
          }`}
          disabled={otp === ""}
          onClick={handleSubmit}
        >
          SIGNUP
        </button>
      </div>
    </div>
  );
}

export default OtpAuthModal;

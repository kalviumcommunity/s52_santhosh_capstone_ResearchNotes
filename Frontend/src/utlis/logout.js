import React from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../Redux/Slices/userSlice';
import { resetNotes } from '../Redux/Slices/noteSlice';
import { resetResults } from '../Redux/Slices/resultSlice';
import { useDispatch } from 'react-redux';


function Logout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try{
              Cookies.remove('accessToken');
              dispatch(resetUser())
              dispatch(resetNotes())
              dispatch(resetResults())
              navigate('/')
        }catch(err){
            toast.error(err.message)
        }
      }
  return {handleLogout}
}

export default Logout;
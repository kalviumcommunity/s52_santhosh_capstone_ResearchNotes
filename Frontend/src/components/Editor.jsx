import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { addCurrentNote, changeMode } from '../Redux/Slices/noteSlice'
import { IoArrowBackSharp } from "react-icons/io5";

function Editor() {

    const {isLogged} = useSelector(state=>state.userData)
    const { currentNote, splitMode } = useSelector((state) => state.noteData)

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!isLogged){
            navigate('/')
        }
        if (!currentNote || !currentNote._id) {
            dispatch(addCurrentNote(location.state))
        }
    },[])

    const handleBack = () => {
        dispatch(addCurrentNote({}))
        dispatch(changeMode(false))
        navigate('/notes')
    }

  return (
    <div className='h-full w-full flex justify-center items-center px-2'>
        <div className={`h-full ${splitMode ? 'w-full' : 'md:w-4/6 xs:w-5/6'} md:p-10 xs:p-3 font-semibold ${currentNote?.color} rounded-lg relative `}>
        <IoArrowBackSharp className='absolute right-4 top-4 text-3xl hover:bg-gray-200 active:bg-gray-300 rounded-full p-1 cursor-pointer' onClick={handleBack} />
            <input type="text" className={`focus:outline-none text-2xl ${currentNote?.color} font-serif font-semibold text-red-500`} 
            value='Enter Your Title Here...'/>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <p className="text-gray-600 focus:outline-none" contentEditable>This is an empty note</p>
        </div>
    </div>
  )
}

export default Editor

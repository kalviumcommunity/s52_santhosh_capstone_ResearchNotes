import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { addCurrentNote, changeSplitMode } from '../Redux/Slices/noteSlice'
import { IoArrowBackSharp } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
  import { MdOutlineEdit } from "react-icons/md";
  import { FiCopy } from "react-icons/fi";
  import { MdOutlineDeleteOutline } from "react-icons/md";
  import { AiOutlineSave } from "react-icons/ai";
  import {changeEditMode} from '../Redux/Slices/noteSlice'

function Editor() {

    const {isLogged} = useSelector(state=>state.userData)
    const { currentNote, splitMode, editMode } = useSelector((state) => state.noteData)

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
        dispatch(changeSplitMode(false))
        navigate('/notes')
    }

    const handleEdit = () => {
        dispatch(changeEditMode(!editMode))
    }

  return (
    <div className='h-full w-full flex justify-center items-center box-border'>
        <div className={`h-full ${splitMode ? 'w-full' : 'md:w-4/6 xs:w-5/6'} font-semibold ${currentNote?.color} bg-gray-100 rounded-lg relative overflow-y-scroll`}>
            <nav className={`w-full sticky top-0 flex ${editMode ? 'justify-end' : 'justify-between'} z-10 text-3xl p-4 ${currentNote?.color}`}>
                {   
                     editMode  ? <AiOutlineSave  className='text-green-600'  /> :
                <>
                <IoArrowBackSharp className='hover:bg-gray-200 active:bg-gray-300 rounded-full p-1 cursor-pointer' onClick={handleBack} />        
                <Menu>
                <MenuButton className='text-2xl hover:bg-gray-200 active:bg-gray-300 rounded-full p-1 cursor-pointer'>
                <BiDotsVerticalRounded/>
                </MenuButton>
                <MenuList className='text-xs w-fit shadow-lg shadow-gray-500' shadow='black'>
                    <MenuItem onClick={handleEdit}><MdOutlineEdit className='mr-2 text-green-600 text-lg' />Edit</MenuItem>
                    <MenuItem><FiCopy className='mr-2 text-primary text-lg' />Create a Copy</MenuItem>
                    <MenuItem><MdOutlineDeleteOutline  className='mr-2 text-red-500 text-lg' />Delete</MenuItem>
                </MenuList>
                </Menu>
                </>
                    }
            </nav>
            <div className='md:px-10 xs:px-3'>
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
    </div>
  )
}

export default Editor

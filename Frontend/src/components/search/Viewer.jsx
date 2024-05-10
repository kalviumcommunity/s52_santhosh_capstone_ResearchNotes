import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setViewer } from '../../Redux/Slices/resultSlice';

function Viewer({viewModal,setViewModal}) {
  const { viewer, results } = useSelector((state) => state.resultData);

  const [index,setIndex] = useState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
    setIndex(viewer.current)
  },[viewer])


  const handleIncrement = () => {
    const next = results[viewer.content].length > index+1  ?  index+1 : 0;
      setIndex(next)
  }

  const handleDecrement = () => {
    const before = index-1 <= 0  ?  results[viewer.content].length-1 : index-1;
    setIndex(before)
  }

  const handleClose = () => {
    dispatch(setViewer({}))
    setViewModal(false)
  }


  return (
    <div>
      <Modal isOpen={viewModal} onClose={handleClose}  size="2xl" isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='font-serif select-none'>{viewer.content == 'images' ? 'Image Viewer' : 'Video Player'}</ModalHeader>
          <ModalCloseButton color="red" size="lg" zIndex={20} />
          <ModalBody>
            <div className='h-full w-full flex items-center justify-between mb-4'>
            <MdNavigateBefore className='text-5xl hover:bg-gray-300 rounded-full cursor-pointer'
            onClick={handleDecrement}
              />
            {
              viewer.content == 'images' ?
              <img src={results?.images[index]?.urls?.small} alt="loading..."
              className='rounded md:h-80 w-96 object-cover select-none'  
              />
              :
              <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${results?.videos[index]?.id?.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            }
              <MdNavigateNext className='text-5xl hover:bg-gray-300 rounded-full cursor-pointer'
               onClick={handleIncrement}
               />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Viewer

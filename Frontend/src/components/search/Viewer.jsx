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
  const {darkMode} = useSelector((state) => state.theme);

  const [index,setIndex] = useState(0)
  const [zoomMode,setZoomMode] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setIndex(viewer.current)
  },[viewer])


  const handleIncrement = () => {
    const next = results[viewer.content].length > index+1  ?  index+1 : 0;
      setIndex(next)
  }

  const handleDecrement = () => {
    const before = index-1 == -1  ?  results[viewer.content].length-1 : index-1;
    setIndex(before)
  }

  const handleClose = () => {
    dispatch(setViewer({}))
    setViewModal(false)
  }

  useEffect(() => {
    if(viewModal){
      const handleKey = (e) => {
        if (e.key === 'ArrowLeft') {
          handleDecrement();
        } else if (e.key === 'ArrowRight') {
          handleIncrement();
        }
      };
      document.addEventListener('keyup', handleKey);
      return () => {
        document.removeEventListener('keyup', handleKey);
      };
    }
  }, [index]);


  return (
    <div>
      <Modal isOpen={viewModal} onClose={handleClose}  size="2xl" isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent backgroundColor={darkMode && 'black'} shadow='0px 0px 5px gray'>
          <ModalHeader className={`font-serif select-none ${darkMode ? 'text-white' : 'text-black'}`}>{viewer.content == 'images' ? 'Image Viewer' : 'Video Player'}</ModalHeader>
          <ModalCloseButton color="red" size="lg" zIndex={20} />
          <ModalBody className={` ${viewer.content == 'images' &&  'max-h-[80vh]'}`}>
            <div className='h-full w-full flex items-center justify-between mb-4'>
            <MdNavigateBefore className='text-5xl hover:bg-gray-500 rounded-full cursor-pointer  z-10'
            onClick={handleDecrement}
              />
            {
              viewer.content == 'images' ?
              <img src={results?.images[index]?.urls?.small} alt="loading..."
              className={`rounded-md shadow-lg h-[50vh] ${zoomMode ? 'w-[36vw]' : 'max-w-96'} select-none ${zoomMode && 'object-cover'}`} 
              onClick={()=>setZoomMode(!zoomMode)}
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
              <MdNavigateNext className='text-5xl hover:bg-gray-500 rounded-full cursor-pointer z-10'
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

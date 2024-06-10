import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import { useSelector } from 'react-redux'


function DeleteModal({handleDelete,setDeleteModal}) {

  const {darkMode} = useSelector((state)=>state.theme)

  return (
    <div>
      <Modal isOpen={true} onClose={()=>setDeleteModal(false)} isCentered='true' >
        <ModalOverlay />
        <ModalContent bg={darkMode ? '#1a2125' : 'white'}>
          <ModalHeader color={darkMode ? 'white' : 'black'}>Delete Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody color={darkMode ? 'white' : 'black'}>
            Are you sure you want to delete this note?
          </ModalBody>

          <ModalFooter>
            <Button border='2px solid gray' mr={3} size='sm' onClick={()=>setDeleteModal(false)}>
              Cancel
            </Button>
            <Button colorScheme="red" size='sm' onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default DeleteModal


  
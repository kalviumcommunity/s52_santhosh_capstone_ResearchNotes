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


function DeleteModal({handleDelete,setDeleteModal}) {
  return (
    <div>
      <Modal isOpen={true} onClose={()=>setDeleteModal(false)} isCentered='true'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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


  
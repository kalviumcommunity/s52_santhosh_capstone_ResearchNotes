import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCurrentNote,
  updateCurrentNoteContent,
  updateCurrentNoteTitle,
  changeEditMode,
  changeSplitMode,
  updateSingleNote,
  saveLoading,
  deleteSingleNote,
} from "../../Redux/Slices/noteSlice";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import NoteTemplate from "../../utlis/noteHTML";
import axios from "axios";
import DeleteModal from "./DeleteModal";

function Editor() {
  const { isLogged } = useSelector((state) => state.userData);
  const { currentNote, splitMode, editMode } = useSelector(
    (state) => state.noteData
  );

  const [initialNote, setInitialNote] = useState({
    title: "",
    content: "",
  });
  const [deleteModal, setDeleteModal] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let autoSaveTimeout;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!isLogged) {
      dispatch(addCurrentNote({}));
      navigate("/notes");
    }
    setInitialNote({
      title: currentNote?.title || "Enter Your Title Here",
      content: currentNote?.content || "",
    });
    if (currentNote && currentNote.new) {
      dispatch(changeEditMode(true));
    }
    return () => {
      clearTimeout(autoSaveTimeout);
    };
  }, []);

  const iframeHTML = useMemo(
    () => NoteTemplate(initialNote, editMode),
    [initialNote, editMode]
  );

const handleError = () => {
  toast({
    title: 'Network Error',
    status: 'error',
    duration: 3000,
    isClosable: true,
    position: 'top-right',
  });
};

// console.log(currentNote.content)

const saveNote = async (auto = true) => {
  console.log('called')
  clearTimeout(autoSaveTimeout);
  if (currentNote?.loading) return;

  dispatch(saveLoading(true));

  const requestData = {
    title: currentNote.title,
    content: currentNote.content,
  };
  console.log(requestData)

  const config = {
    withCredentials: true,
  };

  try {
    if (currentNote?.new) {
      let newResponse = await axios.post(`${BASE_URL}/post-note`, requestData, config);
      console.log('done')
      dispatch(addCurrentNote({ ...newResponse.data, color: currentNote?.color }));
      if (!auto) {
        setInitialNote({ ...newResponse.data, color: currentNote?.color });
        dispatch(updateSingleNote({ ...newResponse.data, color: currentNote?.color }));
        dispatch(changeEditMode(false));
      }
      return;
    } else {
      let updateResponse = await axios.patch(`${BASE_URL}/update-note/${currentNote._id}`, requestData, config);
      if (!auto) {
        setInitialNote({ ...updateResponse.data, color: currentNote?.color });
        dispatch(updateSingleNote({ ...updateResponse.data, color: currentNote?.color }));
        dispatch(changeEditMode(false));
      }
      return;
    }
  } catch (error) {
    // console.log(error)
    handleError();
  } finally {
    dispatch(saveLoading(false));
  }
};

  const handleTime = (latency) => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      saveNote();
    }, latency);
  };

  const handleBack = () => {
    dispatch(addCurrentNote({}));
    if(splitMode==true){dispatch(changeSplitMode(false))}
    if(editMode == true){dispatch(changeEditMode(false))}
    navigate("/notes");
  };

  const handleEdit = () => {
    dispatch(changeEditMode(true));
  };

  const handleTitleChange = (e) => {
    dispatch(updateCurrentNoteTitle(e.target.innerHTML.trim()));
    handleTime(5000);
  };

  const handleContentChange = (e) => {
    dispatch(updateCurrentNoteContent(e.target.innerHTML.trim()));
    handleTime(5000);
  };

  const handleDrop = (e) => {
    const videoId = e.dataTransfer.getData("text/plain");
    if (!videoId.startsWith("https://")) {
      e.preventDefault();
      const iframeCode = `<iframe width="480" height="270" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      const iframeDocument = iframeRef.current.contentDocument;
      const content = iframeDocument.querySelector("#content");

      // Get the current selection range
      const selection = iframeDocument.getSelection();
      let range;
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
      } else {
        range = iframeDocument.createRange();
        range.selectNodeContents(content);
        range.collapse(false);
      }

      // Create a new range for inserting the iframe code
      const newRange = iframeDocument.createRange();
      newRange.setStart(range.endContainer, range.endOffset);

      // Create a new node with the iframe code
      const iframeNode = iframeDocument.createElement("div");
      iframeNode.innerHTML = iframeCode;

      // Insert the new node at the current position
      newRange.insertNode(iframeNode);

      // Update the selection to the end of the inserted iframe
      newRange.setStartAfter(iframeNode);
      selection.removeAllRanges();
      selection.addRange(newRange);

      // Update the note content and dispatch the action
      const updatedContent = content.innerHTML;
      dispatch(updateCurrentNoteContent(updatedContent));
      setInitialNote((prevState) => ({
        ...prevState,
        content: updatedContent,
      }));
    }
    handleTime(8000);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handleLoad = () => {
      const iframeDocument = iframe.contentDocument;
      if (!iframeDocument) return;
      const title = iframeDocument.querySelector("#title");
      const content = iframeDocument.querySelector("#content");

      if (title && content) {
        title.addEventListener("input", handleTitleChange);
        title.addEventListener("drop", (e) => e.preventDefault());
        content.addEventListener("input", handleContentChange);
        content.addEventListener("drop", handleDrop);
      }
    };
    iframe.addEventListener("load", handleLoad);
    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/delete-note/${currentNote._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(deleteSingleNote({ id: currentNote._id }));
        handleBack();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Network Error",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <div className="h-full flex justify-center items-center box-border">
      {deleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          setDeleteModal={setDeleteModal}
        />
      )}
      <div
        className={`h-full ${
          splitMode ? "w-full" : "md:w-4/6 xs:w-5/6"
        } font-semibold bg-gray-100 rounded-t-lg relative border flex flex-col`}
      >
        <nav
          className={`w-full sticky top-0 flex ${
            editMode ? "justify-end" : "justify-between"
          } z-10 text-3xl p-4 ${currentNote?.color}`}
        >
          {editMode ? (
            <div className="h-5">
              {currentNote?.loading ? (
                <Tooltip label="saving" fontSize="xs">
                  <Spinner size="sm" />
                </Tooltip>
              ) : (
                <Tooltip label="save" fontSize="xs">
                  <div>
                    <IoCloudUploadOutline
                      className="text-2xl cursor-pointer"
                      onClick={() => saveNote(false)}
                    />
                  </div>
                </Tooltip>
              )}
            </div>
          ) : (
            <>
              <IoArrowBackSharp
                className="hover:bg-gray-200 active:bg-gray-300 rounded-full p-1 cursor-pointer"
                onClick={handleBack}
              />
              <Menu>
                <MenuButton className="text-2xl hover:bg-gray-200 active:bg-gray-300 rounded-full p-1 cursor-pointer">
                  <BiDotsVerticalRounded />
                </MenuButton>
                <MenuList
                  className="text-xs w-fit shadow-md shadow-gray-500"
                  shadow="black"
                >
                  <MenuItem onClick={handleEdit}>
                    <MdOutlineEdit className="mr-2 text-green-600 text-lg" />
                    Edit
                  </MenuItem>
                  <MenuItem>
                    <FiCopy className="mr-2 text-primary text-lg" />
                    Create a Copy
                  </MenuItem>
                  <MenuItem onClick={() => setDeleteModal(true)}>
                    <MdOutlineDeleteOutline className="mr-2 text-red-500 text-lg" />
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </nav>
        <iframe
          srcDoc={iframeHTML}
          ref={iframeRef}
          className={`flex-grow ${currentNote?.color} md:px-6 xs:px-2`}
        />
      </div>
    </div>
  );
}

export default Editor;

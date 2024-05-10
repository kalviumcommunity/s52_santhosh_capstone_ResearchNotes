import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addNotes, addCurrentNote, changeEditMode } from "../../Redux/Slices/noteSlice";
import { BsPinAngleFill , BsArrowRight , BsPlusSquareDotted } from "react-icons/bs";
import { Text, Spinner } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import useTypewriter from 'react-typewriter-hook';
import { useNavigate } from "react-router-dom";

function Notes({authLoading,handleAuth}) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { collection,editMode } = useSelector((state) => state.noteData);
  const { isLogged } = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const text = "Upgrade Your Note-Taking Experience";
  const typedText = useTypewriter(text);

  const colors = [
    "bg-amber-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-pink-200",
    "bg-purple-200",
  ];

  const handleFetchNotes = () => {
    if (collection?.length === 0 && isLogged) {
      axios
        .get(`${BASE_URL}/get-notes`, {
          withCredentials: true,
        })
        .then((res) => {
          const coloredNotes = [...res.data,{new:true,_id:'new'}].map((note,index)=>{
            const randomColor = colors[index % colors.length]
            return {...note,color:randomColor}
          })
          dispatch(addNotes(coloredNotes))
        })
        .catch((error) => console.log(error));
    }
  }

  const handleCurrentNote = (note) => {
    dispatch(addCurrentNote(note))
    navigate(`/notes/${note._id}`)
  }

  useEffect(() => {
    handleFetchNotes()
  }, [isLogged]);

  useEffect(()=>{
    if(isLogged){
      dispatch(addCurrentNote({}))
      if(editMode == true){dispatch(changeEditMode(false))}
    }
  },[])

  if (!isLogged) {
    return (
      <div className="h-full flex">
        <div className="h-full flex flex-col justify-center pl-10">
          <h1  className="font-bold text-5xl font-inika text-primary h-12" >
          {typedText}</h1>
          <p className="my-10 w-5/6 font-bold"> 
          Unlock the power of ResearchNotes! Seamlessly integrate YouTube videos, images, and more into your notes, revolutionizing your project management.
          </p>
          <button 
        className={`font-extrabold text-white bg-primary w-40 py-2 rounded-lg border-2 border-primary font-inika flex justify-center items-center ${authLoading && "cursor-not-allowed"} animate-bounce`}
        onClick={handleAuth}
        disabled={authLoading}
        >
        Get started 
        <span className="ml-2 flex justify-center items-center">
        {
           authLoading ?
           <Spinner size='sm' /> :
           <BsArrowRight />  
        }
        </span>
      </button> 
        </div>
        <img
          src="https://res.cloudinary.com/dqijtrvuf/image/upload/v1713088825/ztf7rwrai33trgf4gduj.jpg"
          alt="hero"
          className="h-5/6"
        />
      </div>
    );
  }

  if(Array.isArray(collection) &&
  collection.length === 0){
    return(
      <div className="h-full w-full flex justify-center items-center">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-wrap p-8 relative overflow-y-scroll">
      <p className="absolute font-itim top-2 text-gray-600">Totally <span className="text-red-500">{collection?.length-1}</span> notes found...</p>
      {collection &&
        Array.isArray(collection) &&
        collection.length !== 0 &&
        collection.map((note, ind) => {

          return (
            <div
              key={note._id}
              className={`h-48 w-40 ${note?.color} m-5 rounded-tl-3xl rounded-md shadow-xl shadow-gray-400 hover:shadow-gray-500 transition-shadow duration-300 cursor-pointer relative select-none`}
              onClick={()=>handleCurrentNote(note)}
            >
              
              {!note.new ? (
                <>
                  <div className="absolute top-2 right-2 z-10">
                    <BsPinAngleFill />
                  </div>
                  <div className="w-full h-full flex flex-col justify-center items-center opacity-60 hover:opacity-100 font-serif transition-opacity duration-300">
                    <img
                      src="https://res.cloudinary.com/dqijtrvuf/image/upload/v1712922753/m2hd39asbahhqaf15f6r.png"
                      className="h-3/6 w-4/6 object-cover rounded-tl-3xl rounded-sm mb-4"
                    />
                    <Text
                      noOfLines={1}
                      fontSize="small"
                      className="font-semibold px-1"
                      dangerouslySetInnerHTML={{ __html: note.title}}
                    ></Text>
                  </div>
                  <Text
                    noOfLines={1}
                    fontSize="x-small"
                    className="font-semibold font-serif text-gray-500 absolute bottom-1 left-2"
                  >
                    {note?.updatedAt
                      ? formatDistanceToNow(new Date(note.updatedAt), {
                          addSuffix: true,
                        })
                      : "just now"}
                  </Text>
                </>
              ) : (
                <div className="h-full w-full flex flex-col justify-center items-center text-red-600 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <BsPlusSquareDotted className="text-6xl m-2" />
                  <p className="font-bold">Add New</p>
                </div>
              )}
            </div>
          );
        })
        }
    </div>
  );
}

export default Notes;

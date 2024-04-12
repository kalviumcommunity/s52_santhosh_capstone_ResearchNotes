import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addNotes } from "../Redux/Slices/noteSlice";
import { BsPinAngleFill } from "react-icons/bs";
import { Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { BsPlusSquareDotted } from "react-icons/bs";

function Notes() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const notes = useSelector((state) => state.NoteData);
  const dispatch = useDispatch();

  console.log(notes.collection)

  useEffect(() => {
    if (notes.collection?.length === 0) {
      axios
        .get(`${BASE_URL}/get-notes`, {
          withCredentials: true,
        })
        .then((res) => dispatch(addNotes([...res.data,'new'])))
        .catch((error) => console.log(error));
    }
  }, []);

  const colors = [
    "bg-amber-200",
    "bg-blue-300",
    "bg-green-300",
    "bg-pink-200",
    "bg-purple-300",
  ];

  return (
    <div className="h-full flex flex-wrap p-8">
      {/* <div className='bg-yellow-100 w-4/6 h-full rounded-2xl'>
        
      </div> */}
      {notes.collection &&
        Array.isArray(notes.collection) &&
        notes.collection.map((note, ind) => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          const randomColor = colors[randomIndex];
          return (
            <div
              key={ind}
              className={`h-48 w-40 ${randomColor} m-6 rounded-tl-3xl rounded-md shadow-xl shadow-gray-400 hover:shadow-gray-500 transition-shadow duration-300 cursor-pointer relative`}
            >
              {
                note !== 'new' ? 
                <>
              <div className="absolute top-2 right-2">
                <BsPinAngleFill />
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/notes-4153376-3439385.png" alt="notes png" className="" />
                {/* https://res.cloudinary.com/dqijtrvuf/image/upload/v1712922753/m2hd39asbahhqaf15f6r.png */}
              {/* <Text noOfLines={1}>{note.title}</Text> */}
              </div>
              <Text noOfLines={1} fontSize="x-small" className="font-semibold text-gray-500 absolute bottom-1 left-2">
                {note?.updatedAt ?
                  formatDistanceToNow(new Date(note.updatedAt), {
                    addSuffix: true,
                  }) : 'just now'}
              </Text>
              </> :
               <div className="h-full w-full flex flex-col justify-center items-center text-red-600 opacity-60 hover:opacity-100">
              <BsPlusSquareDotted className="text-6xl m-2"/>
              <p className="font-bold">Add New</p>
              </div>
              }
            </div>
          );
        })}
    </div>
  );
}

export default Notes;

import axios from "axios";
import React, { useState } from "react";
import { Text, Button, Heading } from "@chakra-ui/react";
import {useSelector,useDispatch} from 'react-redux'
import { addResults } from "../../Redux/Slices/resultSlice";

function Youtube(query) {

  const dispatch = useDispatch()
  const {results} = useSelector(state=>state.resultData)


  const API_KEY = import.meta.env.VITE_YT_API_KEY;

  const handleYtResults = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${"javascript"}&type=video&maxResults=10`
      )
      .then((res)=>dispatch(addResults({ key: 'videos', value: res.data.items })))
      .catch((err) => console.log(err.message));
  };


  return (
    <div className="h-full w-full">
      <button onClick={handleYtResults}>click me</button>
      {results.videos && results.videos.length > 0 &&results.videos.map((video,index) => {
        return (
          <div className="flex justify-center items-center m-2" key={index}>
            <img src={video.snippet.thumbnails.medium.url} alt='thumbnail' 
            className="h-32 p-2"
            />  
            <div>
                <Heading noOfLines={1} size='sm'>
                {video.snippet.title}
                </Heading>
                <Text noOfLines={2}>    
                {video.snippet.description}
                </Text>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  size="xs"
                  as="a"
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                >
                  Watch on YouTube
                </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Youtube;




import React, { useState } from "react";
import { Text, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { setViewer } from "../../../Redux/Slices/resultSlice";

function Youtube() {

  const { results } = useSelector((state) => state.resultData);
  const {splitMode} = useSelector(state=>state.noteData)
  const {darkMode} = useSelector(state=>state.theme)


  const dispatch = useDispatch()

  const handleView = (index) => {
    dispatch(setViewer({show:true,content:'videos',current:index}))
  }

  const handleDragStart = (event, videoId) => {
    event.dataTransfer.setData("text/plain", videoId);
  };

  return (
    <div className="h-full w-full  overflow-y-scroll scroll-hide ">
      {results.videos &&
        results.videos.length > 0 ?
        results.videos.map((video, index) => {
          return (
            <div
              className={`flex items-center md:m-2 xs:m-1 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'} rounded-md box-border`}
              key={index}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt="thumbnail"
                className={`${splitMode ? 'h-24' : 'h-28'} p-2 rounded-sm cursor-pointer`}
                onClick={()=>handleView(index)}
                onDragStart={(e)=>handleDragStart(e, video?.id?.videoId)}
              />
              <div className="flex-grow">
                <Heading noOfLines={2} fontSize="small" >
                  {video.snippet.title}
                </Heading>
                { 
                  !splitMode && 
                <Text noOfLines={1} fontSize="x-small">
                  {video.snippet.description}
                </Text>
                }
                <div className=" w-full flex justify-between p-1 text-gray-500 pr-4">
                  <div className="w-10/12">
                    <Text noOfLines={1} fontSize="x-small" className="w-26 font-semibold">
                      {video.snippet.channelTitle}
                    </Text>
                    <Text fontSize="xx-small" noOfLines={1} className="w-10/12">
                      {formatDistanceToNow(
                        new Date(video.snippet.publishedAt),
                        { addSuffix: true }
                      )}
                    </Text>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                  >
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/color/48/youtube-play.png"
                      alt="youtube-play"
                    />
                  </a>
                </div>
              </div>
            </div>
          );
        }) :  Array(5).fill(0).map((_,index)=>{
          return(
              <div key={index} className="flex justify-center items-center h-28 bg-white m-2 p-2 animate-pulse">
                <div className="h-5/6 w-36 bg-slate-400"></div>
                <div className="flex-grow m-2 self-start">
                  <div className="h-4 bg-slate-400 m-2"></div>
                  <div className="h-4 w-32 bg-slate-400 m-2"></div>
                </div>
              </div>
            )
          })
        }
    </div>
  );
}

export default Youtube;

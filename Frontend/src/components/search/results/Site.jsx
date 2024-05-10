import React from "react";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";

function Site() {
  const { results } = useSelector((state) => state.resultData);
  const {splitMode} = useSelector(state=>state.noteData)


  // console.log(results.sites);

  return (
    <div className="h-full w-full overflow-y-scroll">
      {results.sites &&
        results.sites.length !== 0 ?
        results.sites.map((site, index) => {
          return (
            <div
              key={index}
              className="flex items-start p-3 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex-shrink-0 mr-4">
                <img
                  src={
                    site.pagemap?.cse_thumbnail?.[0]?.src ||
                   "https://img.freepik.com/free-photo/ui-ux-representations-with-laptop_23-2150201871.jpg"
                  }
                  alt={site.title}
                  className="w-14 h-14 object-cover rounded-full border border-black"
                />
              </div>
              <div className="flex-grow">
                <a
                  href={site.link}
                  className="text-blue-600 font-medium hover:underline"
                  target="_blank"
                >
                  <Text noOfLines={1} className="font-semibold" dangerouslySetInnerHTML={{ __html: site.htmlTitle }} >
                  </Text>
                </a>
                <Text noOfLines={splitMode ? 1 : 2} className="text-xs"  dangerouslySetInnerHTML={{ __html: site.htmlSnippet }} >
                </Text>
                <Text className="text-gray-500 text-xs" noOfLines={1}>
                  <span>{site.displayLink}</span>
                </Text>
              </div>
            </div>
          );
        }) : Array(5).fill(0).map((_, index)=>{
          return(
            <div key={index} className="flex animate-pulse">
                <div className="h-14 w-14 rounded-full bg-slate-400 mx-4 my-1"></div>
                <div className="w-full">
                  <div className="h-3 w-11/12 bg-slate-400 m-2"></div>
                  <div className="h-3 w-32 bg-slate-400 m-2"></div>
                </div>
            </div>
          )
        })
        }
    </div>
  );
}

export default Site;

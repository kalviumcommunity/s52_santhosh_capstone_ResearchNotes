import React from "react";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";

function Site() {
  const { results } = useSelector((state) => state.resultData);

  // console.log(results.sites);

  return (
    <div className="h-full w-full">
      {results.sites &&
        results.sites.length !== 0 &&
        results.sites.map((site, index) => {
          return (
            <div
              key={index}
              className="flex items-start p-3 rounded-md shadow-md hover:bg-gray-100 transition-colors duration-300"
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
                <Text noOfLines={2} className="text-xs"  dangerouslySetInnerHTML={{ __html: site.htmlSnippet }} >
                </Text>
                <div className="text-gray-500 text-sm">
                  <span>{site.displayLink}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Site;

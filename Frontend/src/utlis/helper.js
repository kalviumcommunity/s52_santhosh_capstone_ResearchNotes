import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addResults } from '../Redux/Slices/resultSlice'


function useHandleFetchResults(query) {

  const dispatch = useDispatch()

  const YT_API_KEY = import.meta.env.VITE_YT_API_KEY
  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
  const GCSE_ID = import.meta.env.VITE_GCSE_ID
  
  const fetchVideos = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=20&videoDuration=long`
      )
      .then((res) => dispatch(addResults({ key: 'videos', value: res.data.items })))
      .catch((err) => console.log(err.message))
  }

  const fetchMeaning = () =>{
        axios.get(`https://api.datamuse.com/words?md=d&sp=${encodeURIComponent(query)}`)
        .then((res) => {
          const meanings = res.data[0]?.defs.map(item => {
            const [pos, meaning] = item.split('\t');
            return meaning;
          });
          dispatch(addResults({ key: 'meaning', value:{word:res.data[0]?.word,defs:meanings}}))})
        .catch((err) => console.log(err.message))
  }

  const fetchImages = () => {
    axios.get('https://api.unsplash.com/search/photos', {
          params: { 
            client_id: UNSPLASH_API_KEY,
            query: encodeURIComponent(query)
          }
      })
      .then((res) => {dispatch(addResults({ key: 'images', value: res.data.results }))})
      .catch((err) => console.log(err.message))
  }

  const fetchSites = () => {
    axios.get(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GCSE_ID}&q=${encodeURIComponent(query)}&alt=json`)
      .then((res) => {
        // console.log(res.data)
        dispatch(addResults({ key: 'sites', value: res.data.items }))
      })
      .catch((err) => console.log(err.message))
  }
 
  return {fetchVideos,fetchMeaning,fetchImages,fetchSites}
}

export default useHandleFetchResults;
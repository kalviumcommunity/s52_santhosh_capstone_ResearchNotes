import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addResults } from '../Redux/Slices/resultSlice'


function useHandleFetchResults(query) {

  const dispatch = useDispatch()

  const YT_API_KEY = import.meta.env.VITE_YT_API_KEY
  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
  
  const fetchVideos = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&part=snippet&q=${query}&type=video&maxResults=20&videoDuration=long`
      )
      .then((res) => dispatch(addResults({ key: 'videos', value: res.data.items })))
      .catch((err) => console.log(err.message))
  }

  const fetchMeaning = () =>{
        axios.get(`https://api.datamuse.com/words?md=d&sp=${query}`)
        .then((res) => {
          const meanings = res.data[0]?.defs.map(item => {
            const [pos, meaning] = item.split('\t');
            return meaning;
          });
          dispatch(addResults({ key: 'meaning', value:{word:res.data[0]?.word,defs:meanings}}))})
        .catch((err) => console.log(err.message))
  }

  const fetchImage = () => {
    axios.get('https://api.unsplash.com/search/photos', {
          params: { 
            client_id: UNSPLASH_API_KEY,
            query: query
          }
      })
      .then((res) => {dispatch(addResults({ key: 'image', value: res.data.results }))})
      .catch((err) => console.log(err.message))
  }
 
  return {fetchVideos,fetchMeaning,fetchImage}
}

export default useHandleFetchResults
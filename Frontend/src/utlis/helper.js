import {useDispatch} from 'react-redux'

export const handleFetchResults = (query) => {
    const dispatch = useDispatch()

  const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

    //youtube videos
    axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&part=snippet&q=${query}&type=video&maxResults=10`
    )
    .then((res)=>dispatch(addResults({ key: 'videos', value: res.data.items })))
    .catch((err) => console.log(err.message));
}
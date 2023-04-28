import { useEffect, useState } from "react";
import Jukebox from "../../Jukebox/Jukebox";

function App() {
  const [tracklist, setTracklist] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const url = './data/playlist.json'
  useEffect(() => {
    setIsLoading(true)
    fetch(url)
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error('Error fetching data')
        }
      })
      .then(data => {
        setIsLoading(false)
        setTracklist(data)
      })
      .catch(error => {
        setIsLoading(false)
        setError('Error loading data:' + error)
      })
  }, [])

  if (error) return <p>{error}</p>
  if (isLoading) return <p>Loading ... </p>
  return (
    <div>
      <Jukebox tracklist={tracklist}/>
    </div>
  );
}

export default App;

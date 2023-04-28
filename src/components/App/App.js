import { Component } from "react";
import Jukebox from "../Jukebox/Jukebox";

const url = './data/playlist.json'

export default class App extends Component {
  state = {
    tracklist: [],
    isLoading: false,
    error: ''
  }

  componentDidMount() {
    this.setState({isLoading: true})
    fetch(url)
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error('Error fetching data')
        }
      })
      .then(data => {
        this.setState({
          isLoading: false,
          tracklist: data
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: 'Error loading data: ' + error.message
        })
      })
  }

  render() {
    const {tracklist, isLoading, error} = this.state
    if (error) return <p>{error}</p>
    if (isLoading) return <p>Loading ... </p>
    return <Jukebox tracklist={tracklist}/>
  }
}

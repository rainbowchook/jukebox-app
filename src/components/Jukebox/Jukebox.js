import { Component } from 'react'
import AudioPlayer from '../AudioPlayer/AudioPlayer'
import {FaVolumeOff} from 'react-icons/fa'
import TrackButton from '../TrackButton/TrackButton'

export default class Jukebox extends Component {
  state={
    song: '',
    title: '',
  }

  componentDidMount() {
    document.title="Jukebox"
    this.initialTitle="Jukebox"
  }

  chooseSong = (song, title) => {
    this.setState({song, title})
  }

  render() {
    const {song, title} = this.state
    return (
      <div className='flex flex-col justify-between'>
        <h1 className='text-7xl font-bold font-shadows text-center mt-10 mb-5'>Jukebox</h1>
        <span className='text-sm'>Select track:</span>
        <div className='grid grid-flow-row grid-cols-1 overflow-y-auto'>
          {
            !this.props.tracklist.length
              ? <p>Loading tracklist ... </p>
              : this.props.tracklist.map(({id, url, title, artist}) =>
                <TrackButton
                  key={id}
                  reverse={this.state.song === url ? 'true' : 'false'}
                  autoFocus={this.state.song === url ? true : false}
                  onClick={() => this.chooseSong(url, title)}
                >
                  <span className='font-bold'>{title}</span>
                  <span className='text-sm'> by {artist}</span>
                </TrackButton>
              )
          }
        </div>
        <div>
          { this.state.song !== '' && <p className='text-xs'>Click to disable audio player:</p> }
          <button className={`text-center text-slate-500 transition-transform ${this.state.song === '' ? 'text-7xl' : 'text-5xl'}`} onClick={() => this.chooseSong('')}> <FaVolumeOff /> </button>
          { this.state.song !== '' &&  <AudioPlayer title={title} audioURL={song} /> }
        </div>

      </div>
    )
  }
}

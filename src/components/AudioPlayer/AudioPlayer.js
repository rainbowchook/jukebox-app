import { Component} from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import {FaPlayCircle, FaPauseCircle} from 'react-icons/fa'
import VolumeBar from '../VolumeBar/VolumeBar'
import PlaybackRateBar from '../PlaybackRateBar/PlaybackRateBar'

export default class AudioPlayer extends Component {
  state = {
    status: 'paused',
    progress: 0,
    duration: 0,
    isSeeking: false,
    error: '',
    mute: false,
    volume: 0.5,
    rate: 1.0,
  }

  componentDidMount() {
    this.initialTitle = document.title
    document.title = `Now playing ${this.props.title}`
    this.audio = new Audio(this.props.audioURL)
    this.audio.autoplay = true
    this.audio.volume = 0.5

    this.audio.addEventListener('abort', (e) => this.setState({error: 'Error: abort'}))
    this.audio.addEventListener('error', (e) => this.setState({error: 'Error'}))

    this.audio.addEventListener('loadeddata', (e) => {
      this.setState({
        duration: this.audio.duration,
        progress: 0,
        rate: this.audio.defaultPlaybackRate
      })
    })
    this.audio.addEventListener('timeupdate', (e) => {
      this.setState({progress: this.audio.currentTime})
    })
    this.audio.addEventListener('play', (e) => {
      this.setState({
        status: 'playing'
      })
    })
    this.audio.addEventListener('pause', (e) => {
      this.setState({
        status: 'paused',
      })
    })
    this.audio.addEventListener('ended', (e) => {
      this.setState({
        status: 'paused',
        progress: 0,
      })
    })
    this.audio.addEventListener('seeking', (e) => {
      this.setState({status: 'paused', isSeeking: true})
    })
    this.audio.addEventListener('seeked', (e) => {
      this.setState({status: 'playing', isSeeking: false})
    })
    this.audio.addEventListener('volumechange', (e) => {
      this.setState({volume: this.audio.volume})
    })
    this.audio.addEventListener('ratechange', (e) => {
      this.setState({rate: this.audio.playbackRate})
    })
  }

  componentDidUpdate(prevProps, prevState) {
    document.title = `Now playing ${this.props.title}`
    if(prevProps.audioURL !== this.props.audioURL) {
      this.audio.load()
      this.audio.src = this.props.audioURL
    }
  }

  componentWillUnmount() {
    document.title = this.initialTitle
    this.audio.pause()
    //remove event listeners - de-reference objects for garbage collection (can't remove event listeners using anonymous fns!)
  }

  onTogglePausePlay = () => {
    const {status} = this.state
    if(status === 'paused') {
      this.audio.play()
    }
    if(status === 'playing') {
      this.audio.pause()
    }
  }

  handleProgressBarChange = (e) => {
    this.setState({progress: e.target.value}) //end time
    //seek operation begins: seeking event fired
    if(e.target.value !== this.audio.currentTime) {
      this.audio.pause()
      let seek = this.audio.seekable
      let start = this.audio.currentTime / this.audio.duration
      let end = e.target.value / this.audio.duration
      if(this.audio.ended) {
        this.audio.currentTime = 0
      } else {
        seek.start(start)
        seek.end(end)
        if(!this.audio.seeking) {
          this.audio.currentTime = e.target.value
          this.audio.play()
        }
      }
    }
  }

  toggleIsSeeking = () => {
    this.setState({isSeeking: !this.state.isSeeking})
  }

  toggleMute = () => {
    this.audio.muted = !this.state.mute
    this.setState({mute: !this.state.mute})
  }

  handleVolumeChange = (e) => {
    if(!this.audio.muted) this.audio.volume = e.target.value
  }

  handleRateChange = (e) => {
    this.audio.playbackRate = e.target.value
  }


  render() {
    const {title} = this.props
    const {duration, progress, error, volume, mute, rate} = this.state
    const {handleProgressBarChange, handleVolumeChange, toggleMute, handleRateChange} = this
    if(error) return <p>{error}</p>
    return (
      <div className='flex flex-col items-center mt-7 bg-gradient-to-br from-sky-50 to-sky-200'>
        <p>
          <span className='text-xs'>Now Playing </span>
          <span className='underline'>{title}</span>
        </p>
        <button
          className='text-7xl text-slate-500 hover:shadow-lg m-5'
          id='playpause'
          onClick={this.onTogglePausePlay}
        >
          { this.state.status === 'paused' ? <FaPlayCircle /> : <FaPauseCircle /> }
        </button>
        <ProgressBar {...{progress, duration, handleProgressBarChange}} />
        <VolumeBar {...{mute, volume, handleVolumeChange, toggleMute}}/>
        <PlaybackRateBar {...{rate, handleRateChange}}/>
      </div>
    )
  }
}

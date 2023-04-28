import { Component } from 'react'
import {FaVolumeMute, FaVolumeDown, FaVolumeUp} from 'react-icons/fa'

export default class VolumeBar extends Component {
  render() {
    const {mute, volume, handleVolumeChange, toggleMute} = this.props
    return (
      <div className='flex flex-row'>
        <button
          className='text-3xl text-slate-500 hover:shadow-lg'
          id='playpause'
          onClick={toggleMute}
        >
          { mute || volume === 0
            ? <FaVolumeMute />
            : ( volume < 0.6
              ? <FaVolumeDown />
              : <FaVolumeUp />
          )}
        </button>
        <span className={!mute ? 'visible' : 'collapse'}>
          <input
            type="range"
            id="volume"
            name="volume"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
          />
        </span>
      </div>
    )
  }
}

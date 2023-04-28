import { Component } from 'react'
import { timeInHrMinSec, leadingZero } from '../../utilities'

export default class ProgressBar extends Component {

  formatTimeMath = (rawTimeInSecs) => {
    const timeFormatted = timeInHrMinSec(rawTimeInSecs)
    return `${leadingZero(timeFormatted[0])}:${leadingZero(timeFormatted[1])}:${leadingZero(timeFormatted[2])}`
  }

  render() {
    const {progress, duration, handleProgressBarChange} = this.props
    return (
      <div className='flex flex-row items-center'>
        <label htmlFor='progressBar'>
          <span className='text-xs'>{this.formatTimeMath(progress)}</span>
          <input
            type="range"
            id="progressBar"
            name="progressBar"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleProgressBarChange}
          />
          <span className='text-xs'>
            {Math.floor(duration - progress) > 0 ? '-' : ''}{this.formatTimeMath(duration - progress)}
          </span>
        </label>
      </div>
    )
  }
}

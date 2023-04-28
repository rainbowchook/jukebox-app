import { Component } from 'react'

export default class PlaybackRateBar extends Component {
  render() {
    const {rate, handleRateChange} = this.props
    return (
      <label htmlFor='rate'>
        <span className='text-xs'>Slow</span>
        <input
          type="range"
          id='rate'
          name='rate'
          min={0.25}
          max={5.0}
          step={0.05}
          value={rate}
          onChange={handleRateChange}
        />
        <span className='text-xs'>Fast</span>
      </label>
    )
  }
}

import React, { Component } from 'react'

export default class TrackButton extends Component {
  render() {
    const {className, reverse, onClick, autoFocus, children} = this.props
    return (
      <button
        reverse={reverse}
        className={`focus:border-sky-700 focus:bg-white focus:text-sky-700 border-2 rounded-none py-2 ${reverse === 'true' ? 'border-sky-700 bg-white text-sky-700' : 'border-white bg-sky-700 text-white'} ${className}`}
        onClick={onClick}
        autoFocus={autoFocus}
      >
        {children}
      </button>
    )
  }
}

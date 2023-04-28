export const timeInHrMinSec = (timeInSecs) => {
  let hours = Math.floor(timeInSecs / 3600)
  timeInSecs %= 3600
  let minutes = Math.floor(timeInSecs / 60)
  let seconds = Math.floor(timeInSecs % 60)
  return [hours, minutes, seconds]
}

export const leadingZero = (time) => time < 10 ? '0' + time : time

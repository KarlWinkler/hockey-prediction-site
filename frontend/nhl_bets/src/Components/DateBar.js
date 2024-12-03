import React from 'react'

import '../styles/date_bar.scss'
import { parseDateString, formattedDate } from '../utils/date'

const DateBar = ({ date }) => {

  let dateWithOffset = (offset) => {
    const parsedDate = parseDateString(date)
    let offsetDate = new Date(parsedDate.getTime() + offset * 24 * 60 * 60 * 1000)

    return formattedDate(offsetDate)
  }

  let goToDate = (e) => {
    window.location.href = '' + e.target.innerHTML
  }

  return (
    <div className='DateBar'>
      <div onClick={(e) => { goToDate(e) }}  className='DateBar-date'>{dateWithOffset(-1)}</div>
      <div onClick={(e) => { goToDate(e) }}  className='DateBar-date selected'>{dateWithOffset(0)}</div>
      <div onClick={(e) => { goToDate(e) }}  className='DateBar-date'>{dateWithOffset(1)}</div>
    </div>
  )
}

export default DateBar
import React from 'react'

import '../styles/date_bar.scss'

const DateBar = ({ date }) => {

  let dateWithOffset = (offset) => {
    let year = date.split('-')[0]
    let month = date.split('-')[1]
    let day = date.split('-')[2]

    return year + '-' + month + '-' + (parseInt(day) + offset)
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
import React from 'react'
import '../styles/team.scss'

const Team = ({ name, icon }) => {
  return (
    <div className='Team'>
      <span className='Team-name'>{name}</span>
      <img className='Team-bg' src={icon}></img>
    </div>
  )
}

export default Team
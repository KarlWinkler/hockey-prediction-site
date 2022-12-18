import React from 'react'
import '../styles/team.scss'

const Team = ({ home, id, name, icon }) => {
  let home_team = home ? 'home-team' : ''

  return (
    <div id={id} className={`Team ${home_team}`}>
      <span className='Team-name'>{name}</span>
      <img className='Team-bg' src={icon}></img>
    </div>
  )
}

export default Team
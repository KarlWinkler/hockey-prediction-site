import React from 'react'

const Team = ({ id, name, icon }) => {
  let toTeam = () => {
    window.location.href = `/teams/${id}`
  }

  return (
    <div id={`team_${id}`} onClick={toTeam}>
      <img className='small-image' src={icon} />
      <span>{name}</span>
    </div>
  )
}

export default Team
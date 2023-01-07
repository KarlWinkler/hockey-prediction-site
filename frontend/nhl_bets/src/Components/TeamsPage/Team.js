import React from 'react'

const Team = ({ id, name, icon }) => {
  return (
    <div id={`team_${id}`}>
      <img src={icon} />
      <span>{name}</span>
    </div>
  )
}

export default Team
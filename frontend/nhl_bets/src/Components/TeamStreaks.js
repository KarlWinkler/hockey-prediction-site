import React from 'react'
import Team from './Team'

import '../styles/team_streaks.scss'

const TeamStreaks = ({ title, list }) => {
  let teamList = () => {
    console.log(list)
    if (list !== null) {
      return list.map(item => {
        console.log(item)
        return( 
          <div className='TeamStreak'>
            <Team id={item.team.id} name={item.team.name} icon={item.team.icon.image} />
            <span className='TeamStreak-count'>{item.streak}</span>
          </div>
        )
      })
    }
  }

  return (
    <div className='TeamStreak-wrapper'>
      <h2>{title}</h2>
      {teamList()}
    </div>
  )
}

export default TeamStreaks
import React from 'react'
import Team from './Team'
import {ReactComponent as DownArrow} from '../svg/down-arrow.svg';

import '../styles/team_streaks.scss'

const TeamStreaks = ({ classList, title, list }) => {
  let teamList = () => {
    console.log(list)
    if (list !== null) {
      return list.map((item, index) => {
        return( 
          <div key={index} className='TeamStreak'>
            <Team id={item.team.id} name={item.team.name} icon={item.team.icon.image} />
            <span className='TeamStreak-count'>{item.streak}</span>
          </div>
        )
      })
    }
  }

  return (
    <div className={`TeamStreak-wrapper ${classList}`}>
      <h2>{title}</h2>
      {teamList()}
      <div className='TeamStreak-expand'><DownArrow /></div>
    </div>
  )
}

export default TeamStreaks
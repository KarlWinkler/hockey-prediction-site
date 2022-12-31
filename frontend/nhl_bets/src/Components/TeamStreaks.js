import React from 'react'
import Team from './Team'
import {ReactComponent as DownArrow} from '../svg/down-arrow.svg';

import '../styles/team_streaks.scss'

const TeamStreaks = ({ classList, title, list, onClickMethod }) => {
  let teamList = () => {
    if (list !== null) {
      return list.map((item, index) => {
        if (item.streak > 1) {
          return(
            <div key={index} className='TeamStreak'>
              <Team id={item.team.id} name={item.team.name} icon={item.team.icon.image} />
              <span className='TeamStreak-count'>{item.streak}</span>
            </div>
          )
        }
      })
    }
  }

  return (
    <div className={`TeamStreak-wrapper ${classList}`}>
      <h2>{title}</h2>
      {teamList()}
      <div className='TeamStreak-expand' onClick={onClickMethod}><DownArrow /></div>
    </div>
  )
}

export default TeamStreaks
import React from 'react'
import TeamTrend from '../Components/TeamTrend'

import '../styles/trends.scss'

const Trends = () => {
  return (
    <div className='Trends'>
      <h1>Trends</h1>
      <TeamTrend endpoint='/api/bets/loss_streak/' />
    </div>
  )
}

export default Trends
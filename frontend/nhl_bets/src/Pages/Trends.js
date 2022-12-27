import React, { useState, useEffect } from 'react'
import TeamStreaks from '../Components/TeamStreaks'

import '../styles/trends.scss'

const Trends = () => {
  let [lossStreaks, setLossStreaks] = useState(null)

  useEffect(() => {
    getLossStreaks()
  }, [])

  let getLossStreaks = async () => {
    let response = await fetch('/api/bets/loss_streak?num_results=3')
    let data = await response.json()
    setLossStreaks(data.loss_streaks)
  }

  return (
    <div className='Trends'>
      <h1>Trends</h1>
      <TeamStreaks title={'Your Longest Losing Streaks'} list={lossStreaks} />
    </div>
  )
}

export default Trends
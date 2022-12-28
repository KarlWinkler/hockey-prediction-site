import React, { useState, useEffect } from 'react'
import TeamStreaks from '../Components/TeamStreaks'

import '../styles/trends.scss'

const Trends = () => {
  let [lossStreaks, setLossStreaks] = useState(null)
  let [winStreaks, setWinStreaks] = useState(null)

  useEffect(() => {
    getLossStreaks()
    getWinStreaks()
  }, [])

  let getLossStreaks = async () => {
    let response = await fetch('/api/bets/loss_streak?num_results=3')
    let data = await response.json()
    setLossStreaks(data.streaks)
  }

  let getWinStreaks = async () => {
    let response = await fetch('/api/bets/win_streak?num_results=3')
    let data = await response.json()
    setWinStreaks(data.streaks)
  }

  return (
    <div className='Trends'>
      <h1>Trends</h1>
      <TeamStreaks title={'Your Longest Losing Streaks'} list={lossStreaks} />
      <TeamStreaks title={'Your Longest Winning Streaks'} list={winStreaks} />
    </div>
  )
}

export default Trends
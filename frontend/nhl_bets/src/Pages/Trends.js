import React, { useState, useEffect } from 'react'
import TeamStreaks from '../Components/TeamStreaks'

import '../styles/trends.scss'

const Trends = () => {
  let [lossStreaks, setLossStreaks] = useState(null)
  let [winStreaks, setWinStreaks] = useState(null)
  let [loseAgainstStreaks, setLoseAgainstStreaks] = useState(null)

  useEffect(() => {
    getLossStreaks()
    getWinStreaks()
    getLoseAgainstStreaks()
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

  let getLoseAgainstStreaks = async () => {
    let response = await fetch('/api/bets/lose_against_streak?num_results=3')
    let data = await response.json()
    setLoseAgainstStreaks(data.streaks)
  }

  return (
    <div className='Trends'>
      <h1>Trends</h1>
      <TeamStreaks title={'You keep picking these teams wrong'} list={lossStreaks} />
      <TeamStreaks title={'You keep picking these teams correctly'} list={winStreaks} />
      <TeamStreaks title={'You have bet against these teams and lost'} list={loseAgainstStreaks} />
    </div>
  )
}

export default Trends
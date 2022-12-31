import React, { useState, useEffect } from 'react'
import TeamStreaks from '../Components/TeamStreaks'

import '../styles/trends.scss'

const Trends = () => {
  let [lossStreaks, setLossStreaks] = useState(null)
  let [winStreaks, setWinStreaks] = useState(null)
  let [loseAgainstStreaks, setLoseAgainstStreaks] = useState(null)
  let [winAgainstStreaks, setWinAgainstStreaks] = useState(null)

  useEffect(() => {
    getStreaks('/api/bets/loss_streak?num_results=3', setLossStreaks)
    getStreaks('/api/bets/win_streak?num_results=3', setWinStreaks)
    getStreaks('/api/bets/lose_against_streak?num_results=3', setLoseAgainstStreaks)
    getStreaks('/api/bets/win_against_streak?num_results=3', setWinAgainstStreaks)
  }, [])

  let getStreaks = async (url, setState) => {
    let response = await fetch(url)
    let data = await response.json()
    setState(data.streaks)
  }

  return (
    <div className='Trends'>
      <h1>Trends</h1>
      <TeamStreaks title={'The last few times you picked this team they lost'} list={lossStreaks} />
      <TeamStreaks title={'The last few times you picked this team they won'} list={winStreaks} />
      <TeamStreaks title={'You have bet against these teams and lost'} list={loseAgainstStreaks} />
      <TeamStreaks title={'You have bet against these teams and won'} list={winAgainstStreaks} />
    </div>
  )
}

export default Trends
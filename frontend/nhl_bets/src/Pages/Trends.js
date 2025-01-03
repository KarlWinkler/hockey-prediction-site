import React, { useState, useEffect } from 'react'
import TeamStreaks from '../Components/TeamStreaks'

import '../styles/trends.scss'

const Trends = () => {
  let [lossStreaks, setLossStreaks] = useState(null)
  let [winStreaks, setWinStreaks] = useState(null)
  let [loseAgainstStreaks, setLoseAgainstStreaks] = useState(null)
  let [winAgainstStreaks, setWinAgainstStreaks] = useState(null)

  let [lossStreaksExpanded, setLossStreaksExpanded] = useState([null, null, null, null])

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
    return data.streaks
  }

  let toggleStreaks = (e, streakName, streak, streakSetter, index) => {
    // debuggerS
    if (lossStreaksExpanded[index] === null) {
      // get the other streaks depending on what was clicked
      let lossStreaks = lossStreaksExpanded
      getStreaks(`/api/bets/${streakName}`, streakSetter).then(value => {
        lossStreaks[index] = value
        setLossStreaksExpanded(lossStreaks)
      })
    }
    let streaks = e.target.closest('.TeamStreak-wrapper')
    streaks.classList.toggle('expanded')

    if (!streaks.classList.contains('expanded')) {
      streakSetter(streak.slice(0, 3))
    }
    else {
      streakSetter(lossStreaksExpanded[index])
    }
  }

  return (
    <div className='Trends'>
      <h1>Trends</h1>
      <TeamStreaks classList={'LossStreak'} title={'The last few times you picked this team they lost'} list={lossStreaks} onClickMethod={e => { toggleStreaks(e, 'loss_streak', lossStreaks, setLossStreaks, 0) }} />
      <TeamStreaks classList={'WinStreak'} title={'The last few times you picked this team they won'} list={winStreaks} onClickMethod={e => { toggleStreaks(e, 'win_streak', winStreaks, setWinStreaks, 1) }} />
      <TeamStreaks classList={'LossAgainstStreak'} title={'You have bet against these teams and lost'} list={loseAgainstStreaks} onClickMethod={e => { toggleStreaks(e, 'lose_against_streak', loseAgainstStreaks, setLoseAgainstStreaks, 2) }} />
      <TeamStreaks classList={'WinAgainstStreak'} title={'You have bet against these teams and won'} list={winAgainstStreaks} onClickMethod={e => { toggleStreaks(e, 'win_against_streak', winAgainstStreaks, setWinAgainstStreaks, 3) }} />
    </div>
  )
}

export default Trends
import React, { useState, useEffect } from 'react'

import PieChart from '../Components/PieChart'
import LineChart from '../Components/LineChart'
import '../styles/home.scss'

const Home = () => {

  let [stats, setStats] = useState(null)
  let [from, setFrom] = useState('')
  let [to, setTo] = useState('')

  useEffect(() => {
    getStats()
  }, [from, to])

  let getStats = async () => {
    let response = await fetch(`/api/bets/stats?from=${from}&to=${to}`, {
      method: 'GET',
      headers: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    })
    let data = await response.json()
    setStats(data)
  }

  return (
    <div className='Home-wrapper'>
      {stats == null ? '' :  <PieChart percent={stats.win_percent * 100} />}
      {stats == null ? '' :  <LineChart dataPoints={stats.win_percents || []} />}
      {console.log(stats)}
      <div className='date-range-selector'>
        <input type='date' onChange={ e => setFrom(e.target.value) } />
        <input type='date' onChange={ e => setTo(e.target.value) } />
      </div>
    </div>
  )
}

export default Home
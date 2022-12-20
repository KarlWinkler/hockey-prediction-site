import React, { useState, useEffect } from 'react'

import PieChart from '../Components/PieChart'
import '../styles/home.scss'

const Home = () => {

  let [stats, setStats] = useState({})
  let [from, setFrom] = useState('2022-01-01')
  let [to, setTo] = useState('2022-12-31')

  useEffect(() => {
    getStats()
  }, [from, to])

  let getStats = async () => {
    let response = await fetch(`/api/bets/stats?from=${from}&to=${to}`)
    let data = await response.json()
    console.log(data)
    setStats(data)
  }

  return (
    <div className='Home-wrapper'>
      {stats == {} ? '' :  <PieChart percent={stats.win_percent * 100} />}
      <div className='date-range-selector'>
        <input type='date' onChange={ e => setFrom(e.target.value) } />
        <input type='date' onChange={ e => setTo(e.target.value) } />
      </div>
    </div>
  )
}

export default Home
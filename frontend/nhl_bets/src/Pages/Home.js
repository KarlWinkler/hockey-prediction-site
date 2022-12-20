import React, { useState, useEffect } from 'react'

import PieChart from '../Components/PieChart'
import '../styles/home.scss'

const Home = () => {

  let [stats, setStats] = useState({})

  useEffect(() => {
    getStats()
  }, [])

  let getStats = async () => {
    let response = await fetch('/api/bets/stats?from=2022-12-13&to=2022-12-20')
    let data = await response.json()
    console.log(data)
    setStats(data)
  }

  return (
    <div className='Home-wrapper'>
      {stats == {} ? '' :  <PieChart percent={stats.win_percent * 100} />}
    </div>
  )
}

export default Home
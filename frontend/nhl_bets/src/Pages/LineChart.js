import React, {useEffect, useState } from 'react'

import NivoLineChart from '../Components/NivoLineChart'
import '../styles/linechart.scss'
import RechartsLineChart from '../Components/RechartsLineChart'

const LineChart = () => {
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

  let data = () => { 
    return stats?.win_percents.map((win_percent, index) => {
        return {
          x: win_percent.start_date.slice(8, 10),
          y: win_percent.win_percent
        }
      }).reverse()
  }


  return (
    <RechartsLineChart data={data()} />
  )
}

export default LineChart

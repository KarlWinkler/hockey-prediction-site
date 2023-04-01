import React, {useEffect, useState } from 'react'

import NivoLineChart from '../Components/NivoLineChart'
import '../styles/linechart.scss'

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
    return [
      {
        id: 'Win %',
        color: '#000000',
        data: stats?.win_percents.map((win_percent, index) => {
          return {
            x: win_percent.start_date.slice(0, 10),
            y: win_percent.win_percent
          }
        }).reverse()
      }
    ]
  }


  return (
    <div className="linechart">
      {stats === null ? '': <NivoLineChart data={data()} /> }
      <div className='date-range-selector'>
        <input type='date' onChange={ e => setFrom(e.target.value) } />
        <input type='date' onChange={ e => setTo(e.target.value) } />
      </div>
    </div>
  )
}

export default LineChart

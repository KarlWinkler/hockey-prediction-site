import React, { useState, useEffect } from 'react'

import PieChart from '../Components/PieChart'
// import LineChart from '../Components/LineChart'
import LineChart from './LineChart'
import Table from '../Components/Table'
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

  let conditionalSign = (conditional) => {
    if (conditional === 'gt' || conditional === 'gte') {
      return '+'
    } else if (conditional === 'lt' || conditional === 'lte') {
      return '-'
    } else {
      return ''
    }
  }

  let scoreDeltas = stats?.by_score_deltas.map((score_delta, index) => {
                      return {
                        'Delta': `${score_delta.delta + conditionalSign(score_delta.conditional)}`,
                        'Wins': score_delta.total_wins_with_delta,
                        'Losses': score_delta.total_losses_with_delta,
                        'Win %': `${(score_delta.win_percent * 100).toFixed(2)}%`
                      }
                    })

  return (
    <div className='Home-wrapper Dashboard-wrapper'>
      {stats && <h1>{stats.total_wins}-{stats.total_losses-stats.et_total_losses}-{stats.et_total_losses}</h1>}
      {stats && <PieChart title='Overall win %' percents={[stats.win_percent * 100, stats.et_percent * 100]} />}
      {stats && <LineChart data={stats.win_percents} />}
      {stats && <Table title='Win % per score delta' rows={scoreDeltas || [{'No Data': 'NaN'}]} />}
      <div className='date-range-selector'>
        <input type='date' onChange={ e => setFrom(e.target.value) } />
        <input type='date' onChange={ e => setTo(e.target.value) } />
      </div>
    </div>
  )
}

export default Home
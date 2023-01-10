import React from 'react'

const Stats = ({ stats }) => {
  return (
    <div>
      <h1>{stats?.name} Stats</h1>
      <p>bets: {stats?.total_bets}</p>
      <p>wins: {stats?.total_wins}</p>
      <p>win %: {stats?.win_percent}</p>
    </div>
  )
}

export default Stats
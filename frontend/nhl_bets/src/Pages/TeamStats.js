import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const TeamStats = () => {
  let { id } = useParams()
  let [stats, setStats] = useState(null)

  useEffect(() => {
    get_team_stats()
  }, [])

  let get_team_stats = async () => {
    console.log(id)
    let response = await fetch(`/api/teams/stats/${id}`)
    let data = await response.json()
    console.log(data)
    setStats(data)
  }

  return (
    <div>
      <h1>{stats?.name} Stats</h1>
      <p>bets: {stats?.total_bets}</p>
      <p>wins: {stats.total_wins}</p>
      <p>win %: {stats.win_percent}</p>
    </div>
  )
}

export default TeamStats
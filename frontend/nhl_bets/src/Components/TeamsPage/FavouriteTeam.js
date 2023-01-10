import React, { useState, useEffect } from 'react'

import '../../styles/favourite_team.scss'
const FavouriteTeam = () => {
  let [team, setTeam] = useState(null)
  let [stats, setStats] = useState(null)

  let get_favourite_team = async () => {
    let response = await fetch(`/api/user`)
    let data = await response.json()

    console.log(data)
    setTeam(data.favourite_team)

    get_team_stats(data)
  }


  useEffect(() => {
    get_favourite_team()
  }, [])

  let get_team_stats = async (team) => {
    let response = await fetch(`/api/teams/stats/${team.id}`)
    let data = await response.json()
    setStats(data)
  }

  return (
    <div className='FavouriteTeam'>
      <img src={team && team.icon.image} />
      <p>{team && team.name}</p>
      <div className='FavouriteTeam-stats'>
        <p>Total Bets: {stats && stats.total_bets}</p>
        <p>Correct: {stats && stats.total_wins}</p>
        <p>Incorrect: {stats && stats.total_losses}</p>
        <p>Win Percent: {stats && stats.win_percent * 100}%</p>
      </div>
    </div>
  )
}

export default FavouriteTeam
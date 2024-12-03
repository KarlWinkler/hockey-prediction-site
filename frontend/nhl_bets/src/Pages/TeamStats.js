import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Stats from '../Components/TeamsPage/Stats'
import SetFavourite from '../Components/TeamsPage/SetFavourite'
import TeamGames from '../Components/TeamsPage/TeamGames'

const TeamStats = () => {
  let { id } = useParams()
  let [stats, setStats] = useState(null)

  useEffect(() => {
    get_team_stats()
  }, [])

  let get_team_stats = async () => {
    let response = await fetch(`/api/teams/stats/${id}`)
    let data = await response.json()
    setStats(data)
  }

  return (
    <div>
      <Stats stats={stats} />
      <SetFavourite id={id} />
      <TeamGames id={id} />
    </div>
  )
}

export default TeamStats
import React, { useState, useEffect } from 'react'
import Team from './Team'

const TeamTrend = ({ endpoint }) => {
  let [teams, setTeams] = useState(null)

  useEffect(() => {
    get_teams()
  }, [])

  let get_teams = async () => {
    let response = await fetch(endpoint)
    let data = await response.json()
    setTeams(data)
  }

  let teamList = () => {
    if (teams !== null) {
      return teams.map(team => {
        <Team id={team.id} name={team.name} icon={team.icon.image} />
      })
    }
  }

  return (
    <div className='TeamTrend'>
      {teamList()}
    </div>
  )
}

export default TeamTrend
import React, { useState, useEffect } from 'react'

import Team from '../Components/TeamsPage/Team'
import '../styles/teams_page.scss'
const Teams = () => {
  let [teams, setTeams] = useState([])

  useEffect(() => {
    get_teams()
  }, [])

  let get_teams = async () => {
    let response = await fetch('/api/teams')
    let data = await response.json()
    setTeams(data)
  }

  let teamList = () => {
    if (teams.length === 0) {
      return <h1>Loading...</h1>
    }
    else {
      return teams.map((team, index) => {
        return (<Team key={index} id={team.id} name={team.name} icon={team.icon.image}/>)
      })
    }
  }


  return (
    <div className='Teams'>
      {teamList()}
    </div>
  )
}

export default Teams
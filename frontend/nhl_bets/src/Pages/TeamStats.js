import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const TeamStats = () => {
  let { id } = useParams()

  useEffect(() => {
    get_team_stats()
  }, [])

  let get_team_stats = async () => {
    console.log(id)
    let response = await fetch(`/api/teams/stats/${id}`)
    let data = await response.json()
    console.log(data)
  }

  return (
    <div>{id}</div>
  )
}

export default TeamStats
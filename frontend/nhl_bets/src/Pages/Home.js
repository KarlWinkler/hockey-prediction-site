import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Team from '../Components/Team'
import '../styles/home.scss'
import '../styles/game.scss'

const Home = () => {
  let [games, setGames] = useState(null)
  let { date } = useParams()

  let updateGames = async (e) => {
    let selectDate = date ? date : new Date().toJSON().slice(0,10) 
    let response = await fetch(`/api/games/${selectDate}`)
    let data = await response.json()
    console.log(data)
    setGames(data)
  }

  useEffect(() => {
    updateGames()
    gameList()
  }, [])

  let gameList = () => {
    if(games !== null && games !== undefined) {
      return games.map((element, index) => {
        let home_team = element.home_team
        let away_team = element.away_team

        return (
          <div className='Game' key={index}>
            <Team name={home_team.name} icon={home_team.icon.image} /> vs. <Team name={away_team.name} icon={away_team.icon.image} />
          </div>
        )
      });
    }
  }

  return (
    <div className='Home-wrapper'>
      {gameList()}
    </div>
  )
}

export default Home
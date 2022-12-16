import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import '../styles/home.scss'

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
        return <p key={index}>{element.home_team} vs. {element.away_team}</p>
      });
    }
  }

  return (
    <div className='Home-wrapper'>
      <div>{gameList()}</div>
    </div>
  )
}

export default Home
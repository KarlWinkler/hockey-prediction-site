import React, { useState, useEffect } from 'react'

import '../styles/home.scss'

const Home = () => {
  let [games, setGames] = useState(null)

  let updateGames = async (e) => {
    let response = await fetch(`/api/games`)
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
      return games.map((element, index) => <p key={index}>{element.home_team} vs. {element.away_team}</p>);
    }
  }

  return (
    <div className='Home-wrapper'>
      <div>{gameList()}</div>
    </div>
  )
}

export default Home
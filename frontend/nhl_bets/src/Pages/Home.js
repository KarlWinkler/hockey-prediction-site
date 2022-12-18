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
      return games.map((game, index) => {
        let home_team = game.home_team
        let away_team = game.away_team

        return (
          <div id={game.game_id} className='Game' key={index} onClick={pickTeam}>
            <Team home={true} name={home_team.name} icon={home_team.icon.image} /> vs. <Team name={away_team.name} icon={away_team.icon.image} />
          </div>
        )
      });
    }
  }

  let pickTeam = (e) => {
    let game = e.target.closest('.Game')
    let team = e.target.closest('.Team')

    console.log(team)
    if (team.classList.contains('home-team')) {
      game.classList.remove('Selected-away')
      game.classList.toggle('Selected-home')
    }
    else {
      game.classList.remove('Selected-home')
      game.classList.toggle('Selected-away')
    }
  }

  let sendBet = async (game, team) => {
    let response = await fetch(`/api/bets/${game}/${team}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    let data = await response.json()
    console.log(data)
  }

  return (
    <div className='Home-wrapper'>
      {gameList()}
    </div>
  )
}

export default Home
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Team from '../Components/Team'
import getCookie from '../Extras/GetCookie'
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
          <div id={game.id} className='Game' key={index} onClick={pickTeam}>
            <Team id={home_team.id} home={true} name={home_team.name} icon={home_team.icon.image} /> vs. <Team id={away_team.id} name={away_team.name} icon={away_team.icon.image} />
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
      if(game.classList.contains('Selected-home')) {
        deleteBet(game.id)
      }
      else {
        sendBet(game.id, 'home')
      }
      game.classList.remove('Selected-away')
      game.classList.toggle('Selected-home')
    }
    else {
      if(game.classList.contains('Selected-away')) {
        deleteBet(game.id)
      }
      else {
        sendBet(game.id, 'away')
      }
      game.classList.remove('Selected-home')
      game.classList.toggle('Selected-away')
    }
  }

  let sendBet = async (game, pick) => {
    let response = await fetch(`/api/bets/${game}/${pick}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
    })
    let data = await response.json()
    console.log(data)
  }

  let deleteBet = async (game) => {
    let response = await fetch(`/api/bets/${game}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
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
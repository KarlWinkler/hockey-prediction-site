import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getCookie from '../Extras/GetCookie'

import Team from '../Components/Team'
import LoadGames from '../Components/LoadGames'
import DateBar from '../Components/DateBar'
import '../styles/game.scss'

const Games = () => {
  let [games, setGames] = useState(null)
  let [bets, setBets] = useState(null)
  let { date } = useParams()

  useEffect(() => {
    get_games()
  }, [])

  useEffect(() => {
    get_bets()
    gameList()
  }, [games])

  useEffect(() => {
    updateGamesBets()
  }, [bets])

  let get_games = async () => {
    let selectDate = date

    console.log(new Date() )

    let response = await fetch(`/api/games/${selectDate + timezone()}`)
    let data = await response.json()
    setGames(data)
    // get_bets()
  }

  let timezone = () => {
    let date = new Date()
    let offset = date.getTimezoneOffset()
    let hours = ('00' + Math.floor(offset / 60)).slice(-2)
    let minutes = ('00' + offset % 60).slice(-2)
    let operator = offset < 0 ? '+' : '-'
    return `T00%3A00%3A00${operator}${hours}%3A${minutes}`
  }

  let get_bets = async () => { 
    if (games !== null) {
      let gameList = games.map(game => game.id)
      console.log(gameList)
      let response = await fetch(`/api/bets?games=${gameList}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        }
      })

      let data = await response.json()
      setBets(data)
    }
  }

  let gameList = () => {
    if(games !== null && games !== undefined) {
      return games.map((game, index) => {
        let home_team = game.home_team
        let away_team = game.away_team

        return (
          <div id={`game_${game.id}`} className={`Game ${game.status} winner_${game.winner}`} key={index} onClick={pickTeam}>
            <Team id={`team_${home_team.id}`} home={true} name={home_team.name} icon={home_team.icon.image} />

            <span>
              <span className='score'>{game.home_score}</span>
              vs.
              <span className='score'>{game.away_score}</span>
            </span>

            <Team id={`team_${away_team.id}`} name={away_team.name} icon={away_team.icon.image} />
          </div>
        )
      });
    }
  }

  let updateGamesBets = async (e) => {
    if (bets !== null) {
      console.log(bets)
      bets.forEach(bet => {
        let game = document.getElementById(`game_${bet.game}`)
        if (game !== null) {
          game.classList.add(`Selected-${bet.pick}`)
          
          if (game.classList.contains('Final') || game.classList.contains('Over')) {
            let winner = game.className.match(/winner_[\S]{4}/)[0].split('_')[1]
            if (winner == bet.pick) {
              console.log('winner', winner, bet.pick)
              game.classList.add('correct')
            }
            else {
              game.classList.add('incorrect')
            }
          }
          else if (game.classList.contains('Progress')) {
            game.classList.add('in-progress')
          }
        }
      });
    }
  }

  let pickTeam = (e) => {
    let game = e.target.closest('.Game')
    let team = e.target.closest('.Team')

    if (game.classList.contains('Final') || game.classList.contains('Progress')) {
      return
    }

    if (team.classList.contains('home-team')) {
      if(game.classList.contains('Selected-home')) {
        deleteBet(game.id.split('_')[1])
      }
      else {
        sendBet(game.id.split('_')[1], 'home')
      }
      game.classList.remove('Selected-away')
      game.classList.toggle('Selected-home')
    }
    else {
      if(game.classList.contains('Selected-away')) {
        deleteBet(game.id.split('_')[1])
      }
      else {
        sendBet(game.id.split('_')[1], 'away')
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
    console.log(`/api/bets/${game}`)
  }

  let deleteBet = async (game) => {
    let response = await fetch(`/api/bets/delete/${game}`, {
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
      <DateBar date={date}/>
      <LoadGames date={date}/>
      {gameList()}
    </div>
  )
}

export default Games
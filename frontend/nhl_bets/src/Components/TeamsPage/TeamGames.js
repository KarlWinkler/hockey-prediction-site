import React, { useState, useEffect } from 'react'

import '../../styles/game.scss'

const TeamGames = ({ id }) => {
  // let { id } = useParams()
  let [games, setGames] = useState(null)
  let [bets, setBets] = useState(null)

  useEffect(() => {
    get_team_games()
  }, [])

  useEffect(() => {
    get_team_bets()
  }, [games])

  let get_team_bets = async () => {
    let gameList = games.map(game => game.id)
    let response = await fetch(`/api/bets?games=${gameList}`)
    let data = await response.json()
    setBets(data)
  }

  let get_team_games = async () => {
    let response = await fetch(`/api/games?team=${id}`)
    let data = await response.json()
    setGames(data)
  }

  let renderGames = () => {
    return games.map((game, index) => {
      return(
        <div id={`game_${game.id}`} className='Game-small' key={index}>
          <div className={`home ${'home' === game.winner ? 'winner' : ''}`}>
            <img className='small-image' src={game.home_team.icon.image}></img>
            <div className='home'>{game.home_score}</div>
          </div>
          vs
          <div className={`away ${'away' === game.winner ? 'winner' : ''}`}>
            <img className='small-image' src={game.away_team.icon.image}></img>
            <div>{game.away_score}</div>
          </div>
        </div>
      )
    })
  }

  let renderBets = () => {
    bets.forEach(bet => {
      let game_div = document.getElementById(`game_${bet.game}`)
      let game = games.find(game => game.id == bet.game)
      if (game.winner == bet.pick) {
        game_div.classList.add('correct')
      }
      else if (game.winner) {
        game_div.classList.add('incorrect')
      }
    });
  }

  return (
    <div className="Games-small">
      {games ? renderGames() : ''}
      {bets ? renderBets() : null}
    </div>
  )
}

export default TeamGames
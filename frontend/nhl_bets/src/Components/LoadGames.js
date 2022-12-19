import React, { useState } from 'react'
import getCookie from '../Extras/GetCookie'
import '../styles/load_games.scss'

const LoadGames = ({ date }) => {
  let [games, setGames] = useState(null)

  let updateGames = async () => {
    console.log('date', date)
    let response = await fetch(`/api/games/update${'/' + date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
    })
    let data = await response.json()
    setGames(data)
    console.log(games)
    window.location.reload()
    // document.querySelector('#games').innerHTML = gameList().map(game => '<p>' + game + '</p>').join('')
  }

  let gameList = () => {
    if(games !== null && games.dates !== undefined) {
      return games.dates[0].games.map(game => game.gamePk)
    }
  }

  return (
    <div className='LoadGames'>
      <div onClick={updateGames}>Update Games</div>
    </div>
  )
}

export default LoadGames
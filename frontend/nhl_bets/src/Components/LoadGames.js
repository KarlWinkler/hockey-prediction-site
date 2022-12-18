import React, { useState } from 'react'
import getCookie from '../Extras/GetCookie'

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
    // document.querySelector('#games').innerHTML = gameList().map(game => '<p>' + game + '</p>').join('')
  }

  let gameList = () => {
    if(games !== null && games.dates !== undefined) {
      return games.dates[0].games.map(game => game.gamePk)
    }
  }

  return (
    <div className=':)'>
      <button onClick={updateGames}>Update Games</button>
    </div>
  )
}

export default LoadGames
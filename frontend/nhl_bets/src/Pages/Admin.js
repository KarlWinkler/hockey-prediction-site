import React, { useState } from 'react'
import getCookie from '../Extras/GetCookie'

const Admin = () => {
  let [games, setGames] = useState(null)

  let updateGames = async () => {
    let date = document.querySelector('#date').value
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
    <div className='Home-wrapper'>
      <button onClick={updateGames}>Update Games</button>
      <div id='games'></div>

      <input type='date' id='date' />
      <button onClick={updateGames}>Update Games 18th</button>
      <div id='games'></div>
    </div>
  )
}

export default Admin
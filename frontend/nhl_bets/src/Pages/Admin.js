import React, { useState } from 'react'

const Admin = () => {
  let [games, setGames] = useState(null)

  let updateGames = async (e) => {
    let response = await fetch(`/api/games/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    let data = await response.json()
    setGames(data)
    console.log(games)
    document.querySelector('#games').innerHTML = gameList().map(game => '<p>' + game + '</p>').join('')
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
    </div>
  )
}

export default Admin
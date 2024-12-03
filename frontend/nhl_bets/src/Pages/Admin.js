import React, { useState } from 'react'
import getCookie from '../Extras/GetCookie'

import LoadGames from '../Components/LoadGames'

const Admin = () => {
  let [games, setGames] = useState(null)
  let [date, setDate] = useState(new Date().toJSON().slice(0,10))

  let updateGames = async () => {
    let response = await fetch(`/api/games/update${'/' + date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
    })
    let data = await response.json()
    setGames(data)
  }

  return (
    <div>
      <input id='date' type='date' onChange={(e) => {setDate(e.target.value)}} />
      <LoadGames date={date}/>
    </div>
  )
}

export default Admin
import React from 'react'

import getCookie from '../../Extras/GetCookie'
const SetFavourite = ({ id }) => {
  let setFavourite = async() => {
    let response = await fetch(`/api/user/favourite_team/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      }
    })
    let data = await response.json()
  }

  return (
    <div>
      <div className='Button' onClick={setFavourite}>Set as favourites</div>
    </div>
  )
}

export default SetFavourite
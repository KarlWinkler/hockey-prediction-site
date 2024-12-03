import React, { useState, useEffect } from 'react'

import getCookie from '../Extras/GetCookie'
const FriendsSearch = ({ data }) => {
  let [searched, setSearched] = useState([])

  useEffect(() => {
    setSearched(data)
  }, [data])

  let search = (e) => {
    if (!data) return

    let search = e.target.value
    let filtered = data.filter((item) => {
      return item.username.toLowerCase().includes(search.toLowerCase())
    })

    setSearched(filtered)
  }

  let results = () => {
    return searched.map((item) => {
      return (
        <div>
          <h1 key={item.id} onClick={() => { addFriend(item.id) }} >{item.username}</h1>
        </div>
      )
    })
  }

  let addFriend = async (id) => {
    let response = await fetch(`/api/user/friends/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
    })
    let data = await response.json()
  }

  return (
    <div>
      <input type='text' onChange={search} />
      <div className='SearchResults'>{results()}</div>
    </div>
  )
}

export default FriendsSearch
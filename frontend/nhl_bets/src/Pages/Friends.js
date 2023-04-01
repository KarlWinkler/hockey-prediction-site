import React, { useState, useEffect } from 'react'

const Friends = () => {
  let [friends, setFriends] = useState(null)

  let get_data = async () => {
    let response = await fetch('/api/user/friends')
    let data = await response.json()
    setFriends(data)
    console.log(data)
  }

  useEffect(() => {
    get_data()
  }, [])

  let friendsList = () => {
    return friends.map((item) => {
      return (
        <div>
          <h1 key={item.id}>{item.user.username}</h1>
        </div>
      )
    })
  }

  return (
    <div>
      <h1>Friends</h1>
      {friends ? friendsList() : "Loading..." }
      <div className='Button' onClick={() => {window.location.href = '/friends/add'}}>Add</div>
    </div>
  )
}

export default Friends
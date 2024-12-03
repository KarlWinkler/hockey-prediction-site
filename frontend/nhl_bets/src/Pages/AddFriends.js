import React, { useState, useRef, useEffect } from 'react'
import FriendsSearch from '../Components/FriendsSearch'

const AddFriends = () => {
  let usersList = useRef(null)
  let [users, setUsers] = useState(null)

  let get_data = async () => {
    if (usersList.current) return

    let response = await fetch('/auth/users')
    let data = await response.json()
    usersList.current = data
  }

  useEffect(() => {
    get_data()
  }, [])

  return (
    <div>
      <h1>Add Friends</h1>
      {usersList.current ? <FriendsSearch data={usersList.current} /> : "Loading..." }
    </div>
  )
}

export default AddFriends
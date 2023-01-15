import React, { useState, useEffect } from 'react'
import Search from '../Components/Search'

const Friends = () => {
  let [users, setUsers] = useState(null)

  let get_data = async () => {
    let response = await fetch('/auth/users')
    let data = await response.json()
    setUsers(data)
    console.log(data)
  }

  useEffect(() => {
    get_data()
  }, [])

  return (
    <div>
      <h1>Friends</h1>
      <Search data={users} />
    </div>
  )
}

export default Friends
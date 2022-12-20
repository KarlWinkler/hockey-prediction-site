import React from 'react'
import '../styles/header.scss'

const Header = () => {

  let toDashboard = () => {
    window.location.href = '/'
  }

  let toGames = () => {
    let year = `${new Date().getFullYear()}`
    let month = `${new Date().getMonth() + 1}`
    let day = `${new Date().getDate()}`
    let date = `${year}-${month}-${day}`
    
    window.location.href = `/games/${date}`
  }
  
  return (
    <div className='Header'>
      {console.log(new Date().toJSON().slice(0, 10))}
      <div className='Header-logo'>Header</div>
      <div className='Header-links'>
        <div className='Header-link' onClick={toDashboard} >Dashboard</div>
        <div className='Header-link' onClick={toGames} >Games</div>
      </div>
    </div>
  )
}

export default Header
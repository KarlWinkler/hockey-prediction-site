import React from 'react'
import LoginSignUpPrompt from '../Components/LoginSignUpPrompt'

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

  let toTrends = () => {
    window.location.href = '/trends'
  }

  let openModal = () => {
    document.querySelector('.Modal').classList.add('active')
    document.querySelector('body').classList.add('modalOpen')
  }

  
  return (
    <div className='Header'>
      {console.log(new Date().toJSON().slice(0, 10))}
      <div className='Header-logo'>Header</div>
      <div className='Header-links'>
        <div className='Header-link' onClick={toDashboard} >Dashboard</div>
        <div className='Header-link' onClick={toGames} >Games</div>
        <div className='Header-link' onClick={toTrends} >Trends</div>
        <a className='Footer-loginButton' onClick={openModal}>Login</a>
        <LoginSignUpPrompt />
      </div>
    </div>
  )
}

export default Header
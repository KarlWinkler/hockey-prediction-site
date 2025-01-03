import React from 'react'
import LoginSignUpPrompt from '../Components/LoginSignUpPrompt'

import getCookie from '../Extras/GetCookie'
import '../styles/header.scss'

const Header = ({ user }) => {

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

  let toTeams = () => {
    window.location.href = '/teams'
  }

  let openModal = () => {
    document.querySelector('.Modal').classList.add('active')
    document.querySelector('body').classList.add('modalOpen')
  }

  let logout = () => {
    fetch('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'X-CSRFToken': getCookie('csrftoken') },
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = '/login'
    })
  }

  let toFriends = () => {
    window.location.href = '/friends'
  }

  let userFeature = () => {
    if (user) {
      return (
        <div>
          {user.username}
          <a className='Footer-loginButton' onClick={logout}>Log Out</a>
        </div>
      )
    }
    else {
     return(<a className='Footer-loginButton' onClick={openModal}>Login</a>)
    }
  }

  
  return (
    <div className='Header'>
      <div className='Header-logo'>Header</div>
      <div className='Header-links'>
        <div className='Header-link' onClick={toDashboard} >Dashboard</div>
        <div className='Header-link' onClick={toGames} >Games</div>
        <div className='Header-link' onClick={toTrends} >Trends</div>
        <div className='Header-link' onClick={toTeams} >Teams</div>
        <div className='Header-link' onClick={toFriends} >Friends</div>
        {userFeature()}
        <LoginSignUpPrompt />
      </div>
    </div>
  )
}

export default Header
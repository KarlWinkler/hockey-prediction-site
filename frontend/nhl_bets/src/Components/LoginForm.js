import React from 'react'
import getCookie from '../Extras/GetCookie'

const LoginForm = () => {
  
  let submit = (e) => {
    let username = document.querySelector('input[name="username"]').value
    let password = document.querySelector('input[name="password"]').value
    let data = {
      username: username,
      password: password
    }
    loginUser(e, data)
  }
  
  let loginUser = async (e, body) => {
    let response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify(body)
    })
    let data = await response.json()
    console.log(data)
    if (response.status === 200) {
      window.location.href = '/'
    }
    else if (response.status === 401) {
      showError(data.message)
    }
  }

  let showError = (message) => {
    let error = document.querySelector('.FormError')
    error.innerHTML = message
    error.classList.add('FormError--active')
  }

  return (
    <div className='Form-wrapper'>
      <div className='Form-header'>
        <h1>Log In</h1>
        <div className='Form Form--login'>
          <p className='FormError'></p>
          <div className='FormInput TextInput'>
            <label className='FormInput-label'>Username</label>
            <input type='text' name='username' placeholder='Username'/>
          </div> 
          <div className='FormInput PasswordInput'>
            <label className='FormInput-label'>Password</label>
            <input type='password' name='password' placeholder='Password' />
          </div>
          <div className='Form-buttons'>
            <a className='Button' onClick={submit} tabIndex="0">Log In</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
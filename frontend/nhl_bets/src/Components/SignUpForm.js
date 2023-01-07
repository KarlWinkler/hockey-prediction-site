import React from 'react'
import getCookie from '../Extras/GetCookie'

const SignUpForm = () => {

  let submit = (e) => {
    if(passwordsMatch()) {
      let username = document.querySelector('input[name="username"]').value
      let email = document.querySelector('input[name="email"]').value
      let password = document.querySelector('input[name="password"]').value
      let data = {
        username: username,
        email: email,
        password: password
      }
      signupUser(e, data)
    }
    else {
      showError('Passwords do not match')
    }
  }

  let passwordsMatch = (e) => {
    let password = document.querySelector('input[name="password"]').value
    let passwordConfirm = document.querySelector('input[name="confirm_password"]').value
    return password === passwordConfirm
  }

  let signupUser = async (e, body) => {
    let response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify(body)
    })
    let data = await response.json()
    console.log(data)
    if (response.status === 201 || response.status === 200) {
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
        <h1>Sign Up</h1>
        <div className='Form Form--signup'>
          <p className='FormError'></p>
          <div className='FormInput TextInput'>
            <label className='FormInput-label'>Username</label>
            <input type='text' name='username' placeholder='Username'/>
          </div>
          <div className='FormInput TextInput'>
            <label className='FormInput-label'>Email</label>
            <input type='text' name='email' placeholder='Username'/>
          </div>
          <div className='FormInput PasswordInput'>
            <label className='FormInput-label'>Password</label>
            <input type='password' name='password' placeholder='Password' />
          </div>
          <div className='FormInput PasswordInput'>
            <label className='FormInput-label'>Confirm Password</label>
            <input type='password' name='confirm_password' placeholder='Password' />
          </div>
          <div className='Form-buttons'>
            <a className='Button' onClick={submit} tabIndex="0">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
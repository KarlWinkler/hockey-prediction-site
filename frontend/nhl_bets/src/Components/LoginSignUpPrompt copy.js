import React from 'react'
import Modal from './Modal'
import { Link } from 'react-router-dom'
import '../styles/modal.scss'
import '../styles/button.scss'
import '../styles/login_sign_up_prompt.scss'

const LoginSignUpPrompt = () => {
  let closeModal = (modal) => {
    document.querySelector('.Modal').classList.remove('active')
    document.querySelector('body').classList.remove('modalOpen')
  }

  let contents = (
    <div className='LoginSignUpPrompt-contents'>
      <div className='LoginSignUpPrompt-header'>
        <h2 className='LoginSignUpPrompt-title'>Login or Sign Up</h2>
      </div>
      <div className='LoginSignUpPrompt-body'>
        <p className='LoginSignUpPrompt-text'>Do you want to Log in to save your submission,</p>
        <p className='LoginSignUpPrompt-text'>and compare your company to other similar companies?</p>
        <div className='LoginSignUpPrompt-buttons'>
          <Link to='/signup' className='Button' onClick={closeModal}>Sign Up</Link>
          <Link to='/login' className='Button Button--secondary' onClick={closeModal}>Log In</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className='loginSignUpModal'>
      <Modal contents={contents} />
    </div>
  )
}

export default LoginSignUpPrompt
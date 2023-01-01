import React from 'react'

const Modal = ({ contents }) => {
  let modalClicked = (e) => {
    let modalContent = document.querySelector('.Modal-content')
    if (e.target !== modalContent && !modalContent.contains(e.target)) {
      closeModal()
    }
  }

  let closeButtonClicked = (e) => {
    closeModal()
  }

  let closeModal = () => {
    debugger;

    document.querySelector('.Modal').classList.remove('active')
    document.querySelector('body').classList.remove('modalOpen')
  }

  return (
    <div className='Modal' onClick={modalClicked}>
      <div className='Modal-wrapper'>
        <div className='Modal-content'>
          <a className='Modal-closeButton' onClick={e => {closeModal()}}>&#215;</a>
          {contents}
        </div>
      </div>
    </div>
  )
}

export default Modal
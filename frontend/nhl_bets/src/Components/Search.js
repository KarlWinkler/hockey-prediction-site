import React from 'react'

const Search = ({ data }) => {
  let search = (e) => {
    if (!data) return

    let search = e.target.value
    let filtered = data.filter((item) => {
      return item.username.toLowerCase().includes(search.toLowerCase())
    })

    let results = document.querySelector('.SearchResults')
    results.innerHTML = ''
    filtered.map((item) => {
      let p = document.createElement('p')
      let text = document.createTextNode(item.username)
      p.append(text)
      results.append(p)
    })

  }

  return (
    <div>
      <input type='text' onChange={search} />
      <div className='SearchResults'></div>
    </div>
  )
}

export default Search
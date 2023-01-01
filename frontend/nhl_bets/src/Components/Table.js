import React from 'react'

import '../styles/table.scss'

const Table = ({ title, rows }) => {

  let tableHeaders = () => {
    let headers = Object.keys(rows[0]).map((key, index) => {
      return (
        <th key={index}>{key}</th>
      )
    })
    return (
      <tr>
        {headers}
      </tr>
    )
  }

  let tableRows = () => {
    let mappedRows = rows.map((row, index) => {
      return (
        <tr key={index}>
          {tableValues(row)}
        </tr>
      )
    })
    return mappedRows
  }

  let tableValues = (row) => {
    let values = Object.values(row).map((value, index) => {
      return (
        <td key={index}>{value}</td>
      )
    })
    return values
  }


  return (
    <div className='Table-wrapper'>
      <h2>{title}</h2>
      <table>
        <thead>
          {tableHeaders()}
        </thead>
        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </div>
  )
}

export default Table
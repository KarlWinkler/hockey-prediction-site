import React from 'react'

const Table = ({ title, rows }) => {

  let tableHeaders = () => {
    let headers = Object.keys(rows[0]).map((key, index) => {
      console.log('headers', key, index)
      return (
        <th>{key}</th>
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
      console.log('table rows', row, index)
      return (
        <tr>
          {tableValues(row)}
        </tr>
      )
    })
    return mappedRows
  }

  let tableValues = (row) => {
    let values = Object.values(row).map((value, index) => {
      console.log('table values', value, index)
      return (
        <td>{value}</td>
      )
    })
    return values
  }


  return (
    <div>
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
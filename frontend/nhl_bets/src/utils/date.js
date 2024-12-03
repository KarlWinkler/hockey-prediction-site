export const parseDateString = (date) => {
  let year = date.split('-')[0]
  let month = date.split('-')[1]
  let day = date.split('-')[2]

  return new Date(`${month}/${day}/${year}`)
}

export const formattedDate = (date) => {
  return date.toISOString().split('T')[0]
}

export const formattedDateFromString = (date) => {
  return formattedDate(parseDateString(date))
}
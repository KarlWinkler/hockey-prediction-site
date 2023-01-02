// https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
import React, { useEffect } from 'react'

import '../styles/pie_chart.scss'

const PieChart = ({ title, percents }) => {

  useEffect(() => {
    setPercent(percents)
  })

  let setPercent = (percents) => {
    let chart = document.querySelector('.PieChart')
    let current_percent = 0

    let gradient = 'conic-gradient('

    percents.map((percent, index) => {

      gradient += `${getColour(index)} ${current_percent}%, `

      current_percent += percent
      gradient += `${getColour(index)} ${current_percent}%, `

    })

    gradient += `var(--colour-incorrect) ${current_percent}%, `

    chart.style.backgroundImage = gradient.slice(0, -2) + ')'
    console.log(gradient.slice(0, -2) + ')')

    // current_percent
  }

  let getColour = (index) => {
    let color1 = 'var(--colour-correct)'
    let color2 = '#FF6E31'
    let color3 = 'hsl(120, 100%, 50%)'

    if (index === 0) {
      return color1
    } else if (index === 1) {
      return color2
    } else if (index === 2) {
      return color3
    }
  }
  
  return (
    <div>
      <h2 className='PieChart-title'>{title}</h2>
      <div className='PieChart' />
      <div className='PieChart-value'>
        <span>{percents[0].toFixed(2)}%</span>
      </div>
    </div>
  )
}

export default PieChart
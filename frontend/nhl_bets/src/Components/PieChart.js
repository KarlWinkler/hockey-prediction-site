// https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
import React, { useEffect } from 'react'

import '../styles/pie_chart.scss'

const PieChart = ({ percent }) => {

  useEffect(() => {
    setPercent(percent)
  })

  let setPercent = (percent) => {
    let chart = document.querySelector('.PieChart-semi');

    let deg = 360 * (percent / 100);

    if (percent >= 50) {
      chart.classList.add('gteq50');
      deg = 360 - deg;
    }
    else {
      chart.classList.remove('gteq50');
      deg = 180 - deg;
    }

    // console.log(`rotate(${deg})`, chart)
    chart.style.transform = `rotate(${deg}deg)`;
  }
  
  return (
    <div>
      <div className='PieChart'>
        <div className='PieChart-semi'></div>
      </div>
      <div className='PieChart-value'>
        <span>{percent.toFixed(2)}%</span>
      </div>
    </div>
  )
}

export default PieChart
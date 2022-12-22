import React, { useEffect } from 'react'

import '../styles/line_chart.scss'

const LineChart = ({ dataPoints }) => {

  useEffect(() => {
    drawDataPoints()
  }, [dataPoints])

  useEffect(() => {
    drawLines()
  })

  let dataPoint = (index, point, chart) => {
      let element = document.createElement('div')
      let y = point.win_percent
      element.className = 'dataPoint'
      // element.id = `data-point-${x}`
      element.style.right = `${index * 20}px`
      element.style.bottom = `${(y * chart.offsetHeight - 9)}px`
      element.title = `${y * 100}%, ${point.start_date.slice(0, 10)}`
      return element
  }

  // <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>
  // https://stackoverflow.com/questions/3492322/javascript-createelementns-and-svg
  // let connectPoints = (x1, x2, y1, y2) => {
  //   let line = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
  //   line.setAttributeNS(null, "width", Math.abs(x2 - x1))
  //   line.setAttributeNS(null, "height", Math.abs(y2 - y1))
  //   line.display = 'block'
    
  //   let lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line')
  //   lineElement.setAttributeNS(null, "x1", x1)
  //   lineElement.setAttributeNS(null, "y1", y1)
  //   lineElement.setAttributeNS(null, "x2", x2)
  //   lineElement.setAttributeNS(null, "y2", y2)
  //   lineElement.setAttributeNS(null, "stroke", "black")

  //   // line.style.width = '100px'
  //   line.style.position = 'absolute'
  //   line.style.right = `${x1 - 11}px`
  //   line.style.bottom = `${y2}px`
  //   line.append(lineElement)
  //   // line.height = `"${Math.abs(y2 - y1)}"`
  //   // let x1 = `"${x1}"`
  //   // let x2 = `"${x2}"`
  //   // let y1 = `"${y1}"`
  //   // let y2 = `"${y2}"`
    
  //   // line.stroke = 'black'
  //   return line
  //     // <svg width={width} height={height}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black"/></svg>
  //   // )
  // }
    

  let drawDataPoints = () => {
    let lineChart = document.querySelector('.LineChart')
    lineChart.innerHTML = ''
    dataPoints.forEach((point, index, array) => {
      // console.log(point, index)
      lineChart.append (dataPoint(index, point, lineChart))

      // if (index > 0) {
      //   let prevPoint = array[index - 1]
      //   let x1 = index * 20
      //   let x2 = (index - 1) * 20
      //   let y1 = point.win_percent * lineChart.offsetHeight
      //   let y2 = prevPoint.win_percent * lineChart.offsetHeight
      //   console.log(x1, x2, y1, y2)
      //   lineChart.append(connectPoints(x1, x2, y1, y2))
      // }
    })
    lineChart.parentElement.style.width = dataPoints.length * 20 + 'px'
    console.log(dataPoints.length * 20)
  }

  let drawLines = () => {
    console.log(document.querySelector('.LineChart'))
    let lineChart = document.querySelector('.LineChart');
    [.25, .5, .75].forEach((percent) => {
      let line = document.createElement('div')
      line.className = 'chartLine'
      line.style.top = `${lineChart.offsetHeight * percent - 2}px`
      lineChart.append(line)
    })
  }

  return (
    <div className='LineChart-wrapper'>
      <div className='LineChart'>
      </div>
    </div>
  )
}

export default LineChart
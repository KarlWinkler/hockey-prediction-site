import '../styles/linechart.scss'
import RechartsLineChart from '../Components/RechartsLineChart'

const LineChart = ({ data }) => {
  let formatData = () => { 
    return data.map((win_percent, index) => {
      return {
        x: win_percent.start_date.slice(8, 10),
        y: win_percent.win_percent
      }
    }).reverse()
  }

  if (!data) {return null}
  return (
    <RechartsLineChart data={formatData()} />
  )
}

export default LineChart

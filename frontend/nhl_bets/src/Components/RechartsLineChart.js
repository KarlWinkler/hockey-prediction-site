import { useState } from 'react'
import { Brush, CartesianGrid, LineChart, Line, Tooltip, XAxis, YAxis  } from 'recharts'
import { toPercentString } from '../utils/number'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{
          backgroundColor: 'var(--colour-background)',
          border: '1px solid var(--colour-grey)',
          color: 'var(--colour-grey)',
          padding: 'var(--spacing-8)',
          margin: 0,
        }}>
        <p style={{
          margin: 0,
        }}>{toPercentString((payload[0].value))}</p>
      </div>
    )
  }

  return null
}

const RechartsLineChart = ({ data }) => {
  const [_, setBrushData] = useState([0, 0]);


  const handleBrushChange = (e) => {
    // Update the selected range of the brush
    setBrushData(e.selectedPayload);
  }

  return (
    <div className='line-chart'>
      <LineChart width={300} height={250} data={data}>
        <Line type="monotone" dataKey="y" stroke="var(--colour-grey)" />
        <CartesianGrid stroke="var(--colour-grey)" strokeDasharray="0" vertical={false} horizontal={true} />
        <Tooltip
          content={<CustomTooltip />}
        />
        <XAxis dataKey="x" tick={{fill: 'white'}} />
        <YAxis
          dataKey="y"
          tickFormatter={(value) => `${value * 100}%`}
          tick={{fill: 'white'}}
        />
        <Brush
          dataKey="name"   // Link the brush to the X-axis data key
          height={30}       // Set the height of the brush area
          stroke="#8884d8"  // Set the brush area border color
          fill="transparent"    // Set the brush area fill color
          onChange={handleBrushChange} // Track the selection change
        />
      </LineChart>
    </div>
  ) 
}

export default RechartsLineChart

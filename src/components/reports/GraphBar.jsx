import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'

import colors from '@/assets/colors'
const GraphBar = ({ data }) => {
  return (
    <BarChart
      dataset={data}
      className="w-full"
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'name',
          tickLabelStyle: { fontSize: 6 },
        },
      ]}
      series={[
        {
          dataKey: 'value',
          label: 'Total de PSTs',
          color: colors.blueDianne,
        },
      ]}
      height={300}
    />
  )
}

export default GraphBar

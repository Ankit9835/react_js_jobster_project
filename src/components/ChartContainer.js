import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/ChartsContainer'
import AreaCharts from './AreaCharts'
import BarCharts from './BarCharts'

const ChartContainer = () => {
  const [barchart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useSelector((store) => store.allJobs)
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barchart)}>
        {barchart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barchart ? <BarCharts data={data} /> : <AreaCharts data={data} />}
    </Wrapper>
  )
}

export default ChartContainer

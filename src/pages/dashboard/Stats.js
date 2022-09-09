import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChartContainer, StatsContainer } from '../../components'
import Loading from '../../components/Loading'
import { showStats } from '../../features/alljobs/allJobSlice'

const Stats = () => {
  const dispatch = useDispatch()
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )
  useEffect(() => {
    dispatch(showStats())
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  )
}

export default Stats

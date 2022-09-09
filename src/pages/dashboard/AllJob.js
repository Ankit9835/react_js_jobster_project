import React from 'react'
import { JobsContainer, SearchContainer } from '../../components'
import allJobSlice from '../../features/alljobs/allJobSlice'

const AllJob = () => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  )
}

export default AllJob

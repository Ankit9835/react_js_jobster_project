import React from 'react'
import { useEffect } from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import { getAllJobs } from '../features/alljobs/allJobSlice'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    numOfPages,
    totalJobs,
    page,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((state) => state.allJobs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
        {numOfPages > 1 && <PageBtnContainer />}
      </div>
    </>
  )
}

export default JobsContainer

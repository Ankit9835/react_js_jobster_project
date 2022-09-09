import React from 'react'
import Wrapper from '../assets/wrappers/JobInfo'

const JobInfo = ({ icon, text }) => {
  return (
    <>
      <span className='icon'>{icon}</span>
      <span className='icon'>{text}</span>
    </>
  )
}

export default JobInfo

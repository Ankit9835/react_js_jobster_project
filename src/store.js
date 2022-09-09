import { configureStore } from '@reduxjs/toolkit'
import allJobSlice from './features/alljobs/allJobSlice'
import jobSlice from './features/job/jobSlice'
import userSlice from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobSlice,
  },
})

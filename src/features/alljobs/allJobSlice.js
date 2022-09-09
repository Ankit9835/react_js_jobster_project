import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import customeFetch from '../../utils/axios'
import { clearValues } from '../job/jobSlice'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk(
  'alljobs/getJobs',
  async (_, thunkAPI) => {
    let url = '/jobs'
    try {
      const resp = await customeFetch.get(url)
      console.log(resp.data)
      return resp.data
    } catch (err) {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
)

export const editJob = createAsyncThunk(
  'alljobs/editJob',
  async ({ jobId, job }, thunkAPI) => {
    try {
      const resp = await customeFetch.patch(`/jobs/${jobId}`, job)
      thunkAPI.dispatch(clearValues())
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteJobs = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    console.log(jobId)
    thunkAPI.dispatch(showLoading())
    try {
      const resp = await customeFetch.delete(`/jobs/${jobId}`)
      thunkAPI.dispatch(getAllJobs())
      return resp.data
    } catch (error) {
      thunkAPI.dispatch(hideLoading())
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const showStats = createAsyncThunk('jobs/stats', async (_, thunkAPI) => {
  try {
    const resp = await customeFetch.get('/jobs/stats')
    console.log(resp.data)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
})

const allJobSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducer: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.jobs = payload.jobs
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [deleteJobs.fulfilled]: (state, { payload }) => {
      toast.success(payload)
    },
    [deleteJobs.rejected]: (state, { payload }) => {
      toast.error(payload)
    },
    [showStats.pending]: (state) => {
      state.isLoading = true
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { showLoading, hideLoading } = allJobSlice.actions

export default allJobSlice.reducer

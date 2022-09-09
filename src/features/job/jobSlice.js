import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customeFetch from '../../utils/axios'
import {
  getLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage'

import { logoutUser } from '../user/userSlice'
import { createJobThunk, updateJobThunk } from './jobThunk'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}

export const createJob = createAsyncThunk('job/createJob', createJobThunk)

export const editJob = createAsyncThunk('job/editJob', updateJobThunk)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState, jobLocation: getLocalStorage()?.location || '' }
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true
    },
    [createJob.fulfilled]: (state) => {
      toast.success('job created')
      return initialState
    },
    [createJob.error]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [editJob.pending]: (state) => {
      state.isLoading = true
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('job modified')
      return { ...initialState }
    },
    [editJob.error]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})
export const { handleChange, clearValues, setEditJob } = jobSlice.actions
export default jobSlice.reducer

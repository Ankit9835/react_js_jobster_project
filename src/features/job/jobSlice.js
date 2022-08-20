import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customeFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { logoutUser } from '../user/userSlice'

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

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const resp = customeFetch.post('/job', job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue(`Unauthorized Logging Out`)
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return initialState
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('job created')
    },
    [createJob.error]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})
export const { handleChange, clearValues } = jobSlice.actions
export default jobSlice.reducer

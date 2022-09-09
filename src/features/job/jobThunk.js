import { showLoading, hideLoading } from '../alljobs/allJobSlice'
import customeFetch from '../../utils/axios'
import { clearValues } from './jobSlice'
import { logoutUser } from '../user/userSlice'

export const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  }
}

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customeFetch.post('/jobs', job)
    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue(`Unauthorized Logging Out`)
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateJobThunk = async ({ jobId, job }, thunkAPI) => {
  console.log(jobId)
  try {
    const resp = await customeFetch.patch(`/jobs/${jobId}`, job)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

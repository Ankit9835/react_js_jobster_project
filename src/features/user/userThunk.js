import customeFetch from '../../utils/axios'
import { logoutUser } from './userSlice'

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customeFetch.post(url, user)
    return resp.data
  } catch (err) {
    //toast.error(err.response.data.msg)
    return thunkAPI.rejectWithValue(err.response.data.msg)
    //console.log(err.response)
  }
}

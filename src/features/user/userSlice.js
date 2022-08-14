import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customeFetch from '../../utils/axios'
import {
  addLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  isSideBarOpen: false,
  user: getLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customeFetch.post('/auth/register', user)
      return resp.data
    } catch (err) {
      //toast.error(err.response.data.msg)
      return thunkAPI.rejectWithValue(err.response.data.msg)
      //console.log(err.response)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customeFetch.post('/auth/login', user)
      return resp.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen
    },
    logoutUser: (state) => {
      state.user = null
      state.isSideBarOpen = false
      removeLocalStorage()
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addLocalStorage(user)
      toast.success(`Hello there ${user.name}`)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addLocalStorage(user)
      toast.success(`Welcome Back ${user.name}`)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { toggleSideBar, logoutUser } = userSlice.actions
export default userSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customeFetch from '../../utils/axios'
import {
  addLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../../utils/localStorage'
import { registerUserThunk } from './userThunk'

const initialState = {
  isLoading: false,
  isSideBarOpen: false,
  user: getLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customeFetch.patch('/auth/updateUser', user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        thunkAPI.rejectWithValue(`Unauthorized logging out`)
      }
      thunkAPI.rejectWithValue(error.response.data.msg)
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
    [updateUser.pending]: (state) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addLocalStorage(user)
      toast.success('User updated')
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { toggleSideBar, logoutUser } = userSlice.actions
export default userSlice.reducer

import axios from 'axios'
import { getLocalStorage } from './localStorage'

const customeFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
})

customeFetch.interceptors.request.use((config) => {
  const user = getLocalStorage()
  if (user) {
    config.headers.common['Authorization'] = `Bearer ${user.token}`
  }
  return config
})

export default customeFetch

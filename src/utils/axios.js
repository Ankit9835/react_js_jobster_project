import axios from 'axios'

const customeFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
})

export default customeFetch

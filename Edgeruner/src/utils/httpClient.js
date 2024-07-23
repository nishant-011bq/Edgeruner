import axios from 'axios'
import { API_ROOT } from './constants'
import Cookies from 'js-cookie'

const TIMEOUT = 60000

const httpClient = (baseURL = API_ROOT, timeout = TIMEOUT) => {
  const authToken = Cookies.get('token')

  const headers = {
    'Content-Type': 'application/json',
  }
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`

  const client = axios.create({
    baseURL,
    timeout,
    headers,
  })

  // Intercept response object and handleSuccess and Error Object
  client.interceptors.response.use(handleSuccess, handleError)

  function handleSuccess(response) {
    return response
  }

  function handleError(error) {
    if (error.response?.status === 400) {
      // Handle forbidden access cases
      console.log('Wrong request:', error.response.data?.message)
    }

    if (error.response?.status === 403) {
      // Handle forbidden access cases
      console.log('Forbidden access:', error.response.data?.message)
    }

    if (error.response?.status === 500) {
      // console.log('50000000', error.response)
      // Redirect to the custom error page
      return Promise.reject(error)
    }

    if (error.response?.status !== 500) {
      return Promise.reject(error.response?.data)
    } else {
      return Promise.reject(error)
    }
  }

  function get(path) {
    return client.get(path).then((response) => response.data)
  }

  function post(path, payload) {
    return client.post(path, payload).then((response) => response.data)
  }

  function put(path, payload) {
    return client.put(path, payload).then((response) => response.data)
  }

  function patch(path, payload) {
    return client.patch(path, payload).then((response) => response.data)
  }

  function _delete(path, data) {
    if (data) {
      return client
        .delete(path, { data: data })
        .then((response) => response.data)
    }
    return client.delete(path).then((response) => response.data)
  }

  return {
    get,
    post,
    put,
    patch,
    delete: _delete,
  }
}

export default httpClient

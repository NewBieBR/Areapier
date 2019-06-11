import axios from 'axios'

import APIRoutes from '../../res/values/APIRoutes'

const API = axios.create({
  baseURL: APIRoutes.baseUrl
})

// Add a request interceptor
API.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('[' + config.method.toUpperCase() + ']: ' + config.url, config)

  return config
}, function (error) {
  // Do something with request error
  console.log('[REQUEST ERROR]:', error)
  return Promise.reject(error)
})

// Add a response interceptor
API.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('[RESPONSE]: ' + response.config.url, response)
  return response
}, function (error) {
  // Do something with response error
  console.log('[RESPONSE ERROR]:', error.response.data)
  return Promise.reject(error)
})

export default API

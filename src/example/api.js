import axios from 'axios'

import apiUrl from '../apiConfig'

export const index = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/examples',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const show = (user, exampleId) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/examples/${exampleId}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const create = (user, newExample) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/examples',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      example: newExample
    }
  })
}

export const update = (user, updatedExample, exampleId) => {
  return axios({
    method: 'PUT',
    url: apiUrl + `/examples/${exampleId}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      example: updatedExample
    }
  })
}

export const destroy = (user, exampleId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/examples/${exampleId}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

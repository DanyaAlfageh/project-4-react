import axios from 'axios'

import apiUrl from '../apiConfig'

export const upload = (newFile, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/uploads',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${user.token}`
    },
    data: newFile
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

export const index = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const show = (user, imageId) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/uploads/${imageId}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const destroy = (user, imageId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/uploads/${imageId}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const update = (user, tag, imageId) => {
  return axios({
    method: 'PUT',
    url: apiUrl + `/uploads/${imageId}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      tags: {
        tag: tag
      }
    }
  })
}

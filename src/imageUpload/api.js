import axios from 'axios'

import apiUrl from '../apiConfig'

export const upload = (newFile) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/uploads',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: newFile
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

export const index = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/uploads'
  })
}

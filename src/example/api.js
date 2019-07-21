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

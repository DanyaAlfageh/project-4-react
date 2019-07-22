import axios from 'axios'

import apiUrl from '../apiConfig'

export const upload = (newFile) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/uploads',
    data: {
      image: newFile
    }
  })
}

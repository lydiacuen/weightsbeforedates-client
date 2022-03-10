import apiUrl from '../apiConfig'
import axios from 'axios'

export const getBuffPost = (user) => {
  return axios.get(apiUrl + '/buffposts/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const getBuffPostById = (user, id) => {
  return axios.get(apiUrl + `/buffposts/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createBuffPost = (user, content, image) => {
  console.log('user', user)
  return axios.post(apiUrl + '/buffposts/create/', {
    buffpost: {
      content,
      image
    }
  }, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
export const updateBuffPost = (user, id, content, image) => {
  return axios.patch(
    apiUrl + `/buffposts/${id}/`, {
      buffpost: {
        content,
        image
      }
    }, {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const deleteBuffPost = (user, id) => {
  return axios.delete(apiUrl + `/buffposts/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

import apiUrl from '../apiConfig'
import axios from 'axios'

export const createComment = (user, content, image) => {
  console.log('user', user)
  return axios.post(apiUrl + '/comments/create/', {
    comment: {
      content,
      image
    }
  }, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const getComment = (user) => {
  return axios.get(apiUrl + '/comments/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const getCommentById = (user, id) => {
  return axios.get(apiUrl + `/comments/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const editComment = (user, id, content, image) => {
  return axios.patch(
    apiUrl + `/comments/${id}/`, {
      comment: {
        content,
        image
      }
    }, {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const deleteComment = (user, id) => {
  return axios.delete(apiUrl + `/comments/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
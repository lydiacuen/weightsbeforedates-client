import apiUrl from '../apiConfig'
import axios from 'axios'

export const createProfile = (user, name, about) => {
  return axios.post(apiUrl + '/profiles/create/', {
    profile: {
      name,
      about
    }
  }, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const getProfile = (user) => {
  return axios.get(apiUrl + '/profiles/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const getProfileById = (user, id) => {
  return axios.get(apiUrl + `/profiles/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const updateProfile = (user, id, name, about) => {
  return axios.patch(
    apiUrl + `/profiles/${id}/`, {
      profile: {
        name,
        about
      }
    }, {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const deleteProfile = (user, id) => {
  return axios.delete(apiUrl + `/profiles/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

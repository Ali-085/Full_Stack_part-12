import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token}`
    }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token}`
    }
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, newObject, config)
  return response.data
}

const removes = async id => {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token}`
    }
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  return response.status
}

export const getComments = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

export const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment })
  return response.data
}


export default { getAll, create, update, removes }

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const unsetToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(config.headers.Authorization)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return request.then(response => response.data)
}

const deleteBlog = id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const data =  { getAll, setToken, unsetToken, create, update, deleteBlog }
export default data
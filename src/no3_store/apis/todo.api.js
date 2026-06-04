import axios from "axios"

export const todoAllGetApi = async () => {
  const response = await axios.get("http://localhost:3001/todos")
  return response.data
}

export const todoGetApi = async (id) => {
  const response = await axios.get(`http://localhost:3001/todos/${id}`)
  return response.data
}

export const todoPostApi = async (dataObj) => {
  const response = await axios.post(
    "http://localhost:3001/todos",
    dataObj
  )

  return response.data
}

export const todoPutApi = async (dataObj) => {
  const response = await axios.put(
    `http://localhost:3001/todos/${dataObj.id}`,
    dataObj
  )

  return response.data
}

export const todoDeleteApi = async (id) => {
  await axios.delete(`http://localhost:3001/todos/${id}`)
  return id
}
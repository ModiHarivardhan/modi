import axios from 'axios'

const baseUrl = '/api/persons' // ✅ Works with Vite proxy in dev


const getAll = () => axios.get(baseUrl).then(res => res.data)
const create = newPerson => axios.post(baseUrl, newPerson).then(res => res.data)
const update = (id, newData) => axios.put(`${baseUrl}/${id}`, newData).then(res => res.data)
const remove = id => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }

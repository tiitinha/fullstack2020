import axios from 'axios'
const baseUrl = '/api/persons'

const req = (request) => {
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return req(request)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return req(request)
}

const remove = (removedId) => {
    const request = axios.delete(`${baseUrl}/${removedId}`)
    return req(request)
}

const replace = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return req(request)
}

export default {getAll, create, remove, replace}
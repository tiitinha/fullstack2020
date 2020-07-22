import axios from 'axios'

const baseUrl = '/api/blogs/'

const getAllComments = (id) => {
    const request = axios.get(`${baseUrl}/${id}/comments`)
    return request.then(response => response.data)
}

const addComment = async (content, blogId) => {
    const request = await axios.post(`${baseUrl}${blogId}/comments`, {content, blogId})
    return request.data
}

export default {
    getAllComments, addComment
}
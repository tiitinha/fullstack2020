import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data.sort(byLikes)
        case 'LIKE_BLOG':
            const liked = action.data
            return state.map(b => b.id === liked.id ? liked : b).sort(byLikes)
        case 'REMOVE_BLOG':
            const removedId = action.data.id
            return state.filter(b => b.id !== removedId)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const data = await blogService.create(blog)
        dispatch({
            type: 'CREATE_BLOG',
            data
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
        const data = await blogService.update(likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data
        })
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog
        })
    }
}

export default reducer
import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_COMMENTS':
            return action.data
        case 'ADD_COMMENT':
            return [...state, action.data]
        default:
            return state
    }
}

export const initializeComments = () => {
    return async dispatch => {
        const data = await commentService.getAllComments()
        dispatch({
            type: 'INIT_COMMENTS',
            data
        })
    }
}

export const addComment = (comment, blogId) => {
    return async dispatch => {
        const addedComment = await commentService.addComment(comment, blogId)
        dispatch({
            type: 'ADD_COMMENT',
            data: addedComment
        })
    }
}

export default commentReducer
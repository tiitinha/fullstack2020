import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeComments } from '../reducers/commentReducer'

const Comments = ({ blogId }) => {

    const dispatch = useDispatch()

    const comments = useSelector(state => state.comments).filter(comment => comment.blog === blogId)

    useEffect(() => {
        dispatch(initializeComments(blogId))
    }, [dispatch, blogId])

    if (!comments) {
        return null
    }

    return (
        <div>
            <ul>
                {comments.map(comment =>
                    <li key={comment.id}>{comment.content}</li>)}
            </ul>
        </div>
    )
}

export default Comments
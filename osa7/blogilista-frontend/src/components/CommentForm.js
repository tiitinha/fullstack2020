import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentReducer'
import { Button } from 'react-bootstrap'

const CommentForm = ({ blogId }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const addNewComment = (event) => {
        event.preventDefault()
        dispatch(addComment(comment, blogId))
        setComment('')
    }

    return (
        <form onSubmit={addNewComment}>
            <input
                type='text'
                id='comment'
                value={comment}
                onChange={({ target }) => setComment(target.value)}
            />
            <Button type='submit' id='addComment'>add comment</Button>
        </form >
    )
}

export default CommentForm
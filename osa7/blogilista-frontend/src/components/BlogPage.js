import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'

const BlogPage = ({ handleLike, handleRemove }) => {

    const id = useParams().id
    const user = useSelector(state => state.user)
    const blog = useSelector(state => state.blogs).find(blog => blog.id === id)
    
    if (!blog) {
        return null
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <div>{blog.url}</div>
            <div>likes {blog.likes}
                <Button onClick={() => handleLike(blog.id)}>like</Button>
            </div>
            <div>added by {blog.user.name}</div>
            {id === user.id && <Button onClick={() => handleRemove(blog.id)}>remove</Button>}
            <h4>comments</h4>
            <CommentForm blogId={blog.id}/>
            <Comments blogId={blog.id}/>
        </div>
    )
}

export default BlogPage
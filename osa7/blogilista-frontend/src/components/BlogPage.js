import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

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
                <button onClick={() => handleLike(blog.id)}>like</button>
            </div>
            <div>added by {blog.user.name}</div>
            {id === user.id && <button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
    )
}

export default BlogPage
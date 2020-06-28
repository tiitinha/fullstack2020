import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        fontWeight: 'bold'
    }

    const buttonStyle = {
        marginLeft: 10
    }

    const buttonStyleRemove = {
        marginTop: 10,
        marginBottom: 10
    }

    const changeVisibility = () => {
        setVisible(!visible)
    }

    const likeAddition = () => {
        addLike({
            user: blog.user,
            author: blog.author,
            title: blog.title,
            url: blog.url,
            likes: blog.likes + 1
        }, blog.id)
    }

    const deleteBlog = () => {
        removeBlog(blog)
    }

    return (
        <div>
            <div className='blog' style={blogStyle} onClick={changeVisibility}>{blog.title}</div>
            {visible ?
                <div>
                    <div className='url'>{blog.url}</div>
                    <div className='likes'>likes: {blog.likes}
                        <button style={buttonStyle} onClick={likeAddition}>Like</button></div>
                    <div>{blog.author}</div>
                    {user.username === blog.user.username ? <button id='remove-button' style={buttonStyleRemove} onClick={deleteBlog}>Remove</button> : null}
                </div>
                : null}
        </div>
    )
}

export default Blog

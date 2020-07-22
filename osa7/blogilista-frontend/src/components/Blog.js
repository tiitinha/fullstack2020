import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {

    let blogStyle
    const [hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }


    const history = useHistory()

    if (hover) {
        blogStyle = {
            paddingTop: 11,
            paddingLeft: 2,
            marginBottom: 6,
            backgroundColor: 'lightblue'
        }
    } else {
        blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }
    }

    return (
        <div onClick={() => history.push(`/blogs/${blog.id}`)} style={blogStyle} className='blog' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
}

export default Blog
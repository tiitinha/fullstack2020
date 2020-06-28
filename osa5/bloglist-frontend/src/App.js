import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        fetchBlogs()
    }, [])

    const blogFormRef = React.createRef()

    const blogForm = () => (
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <NewBlogForm
                handleCreation={handleCreation}
            />
        </Togglable>
    )

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage(null)
        } catch (exception) {
            putMessage(true, 'wrong credentials', '')
        }
    }

    const handleLogoff = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleCreation = async (blogObject) => {

        await blogFormRef.current.toggleVisibility()

        try {
            const createdBlog = await blogService
                .create(blogObject)

            setBlogs(blogs.concat(createdBlog))
            putMessage(false, `a new blog ${blogObject.title} by ${blogObject.author} added`)
            fetchBlogs()

        } catch (exception) {
            setMessage('Invalid blog')
        }
    }

    const fetchBlogs = async () => {
        const blogs = await blogService.getAll()

        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService
                    .remove(blog.id)
                fetchBlogs()
            } catch (exception) {
                setMessage('Error when deleting the blog')
            }
        }
    }

    const addLike = async (blogObject, id) => {
        try {
            await blogService
                .update(blogObject, id)

            fetchBlogs()

        } catch (exception) {
            setMessage('Error when adding likes')
        }
    }

    const putMessage = (error, message, name) => {
        setMessage(
            `${name} ${message}`
        )
        setError(error)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    if (user === null) {
        return (
            <div>
                <h1>Bloglist App</h1>
                <Notification message={message} error={error} />
                <LoginForm
                    username={username}
                    password={password}
                    usernameChange={handleUsernameChange}
                    passwordChange={handlePasswordChange}
                    handleLogin={handleLogin}
                />
            </div>
        )
    }

    return (
        <div>
            <h1>Bloglist App</h1>
            <Notification message={message} error={error} />
            <p>{user.name} logged in</p>
            <button onClick={handleLogoff}>logout</button>
            {blogForm()}
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                    addLike={addLike}
                    removeBlog={deleteBlog}
                    user={user}
                />
            )}
        </div>
    )
}

export default App
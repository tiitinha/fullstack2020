import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

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
        } catch (exception) {
            putMessage(true, `wrong credentials`, '')
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

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleCreation = async (event) => {
        event.preventDefault()
        console.log(title, author, url)

        try {
            blogService
                .create({
                    title: title,
                    author: author,
                    url: url
                })
                .then(createdBlog => {
                    putMessage(false, `a new blog ${title} by ${author} added`)
                })
        } catch (exception) {
            setMessage('invalid blog')
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
            <Notification message={message} error={error}/>
            <p>{user.name} logged in</p>
            <button onClick={handleLogoff}>logout</button>
            <NewBlogForm
                author={author}
                title={title}
                url={url}
                authorChange={handleAuthorChange}
                titleChange={handleTitleChange}
                urlChange={handleUrlChange}
                handleCreation={handleCreation}
            />
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App
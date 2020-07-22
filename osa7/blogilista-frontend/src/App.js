import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'


import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import BlogPage from './components/BlogPage'

import storage from './utils/storage'


import { notifyWith } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { getAllUsers } from './reducers/usersReducer'

const App = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const blogFormRef = React.createRef()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(getAllUsers())
        const loggedUser = storage.loadUser()
        dispatch(login(loggedUser))
    }, [dispatch])

    const createNewBlog = (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(createBlog(blog))
            dispatch(notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`))
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleLike = (id) => {
        const blogToLike = blogs.find(b => b.id === id)
        dispatch(likeBlog(blogToLike))
    }

    const handleRemove = (id) => {
        const blogToRemove = blogs.find(b => b.id === id)
        const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
        if (ok) {
            dispatch(removeBlog(blogToRemove))
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        storage.logoutUser()
    }

    const padding = {
        padding: 5
    }


    return (
        <div className="contianer">
            <Router>
                <div>
                    <Link style={padding} to='/'>blogs</Link>
                    <Link style={padding} to='/users'>users</Link>
                    {user
                        ? <em>{user.name} logged in</em>
                        : <Link style={padding} to='/login'>login</Link>
                    }
                </div>
                <h2>blogs</h2>

                <Notification />

                <Switch>
                    <Route path="/users/:id">
                        <User />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/blogs/:id">
                        <BlogPage 
                            handleLike={handleLike}
                            handleRemove={handleRemove}
                        />
                    </Route>
                    <Route path="/">
                        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                            <NewBlog createBlog={createNewBlog} />
                        </Togglable>

                        {blogs ?
                            blogs.map(blog =>
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                />
                            )
                            : <></>}
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
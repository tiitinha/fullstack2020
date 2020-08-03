
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'


const App = () => {
    const [page, setPage] = useState('authors')
    const [user, setUser] = useState(null)
    const client = useApolloClient()

    const logout = () => {
        setUser(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {user === null
                    ? <button onClick={() => setPage('login')}>login</button>
                    : <div>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={logout}>logout</button>
                    </div>
                }
                <button onClick={() => setPage('recommend')}>recommend</button>
            </div>

            {user 
                ? <div>{user.username} logged in</div>
                : null}
            <Authors
                show={page === 'authors'}
            />

            <Books
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />

            <Login
                show={page === 'login'}
                setUser={setUser}
                setPage={setPage}
            />
            <Recommend 
                show={page === 'recommend'}
                favoriteGenre={user ? user.favoriteGenre : null}
            />
        </div>
    )
}

export default App
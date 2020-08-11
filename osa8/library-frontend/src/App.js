
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from './queries'


const App = () => {
    const [page, setPage] = useState('authors')
    const [user, setUser] = useState(null)
    const client = useApolloClient()

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => {
            set.map(b => b.id).includes(object.id)
        }

        const dataInStore = client.readQuery({ query: ALL_BOOKS })

        if (!includedIn(dataInStore.allBooks, addedBook)) {

            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) }
            })
        }

    }

    const updateCacheAuthors = (addedBook) => {
        const includedIn = (set, object) => {
            set.map(a => a.name).includes(object.author.name)
        }

        const authorsInStore = client.readQuery({ query: ALL_AUTHORS })

        if (!includedIn(authorsInStore.allAuthors, addedBook)) {
            client.writeQuery({
                query: ALL_AUTHORS,
                data: { allAuthors: authorsInStore.allAuthors.concat(addedBook.author) }
            })
        } else {
            client.writeQuery({
                query: ALL_AUTHORS,
                data: { allAuthors: authorsInStore.allAuthors.map(author => author.name === addedBook.author.name ? { ...author, bookCount: author.bookCount + 1 } : author) }
            })
        }
    }

    const updateCacheGenres = (addedBook) => {
        const genresInStore = client.readQuery({ query: ALL_GENRES })

        client.writeQuery({
            query: ALL_GENRES,
            data: { allGenres: [...new Set(genresInStore.allGenres.concat(addedBook.genres))] }
        })
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`${addedBook.title} by ${addedBook.author.name} added`)
            updateCacheWith(addedBook)
            updateCacheAuthors(addedBook)
            updateCacheGenres(addedBook)
        }
    })

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
                updateCacheWith={updateCacheWith}
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
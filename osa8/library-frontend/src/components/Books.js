import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {

    const [filter, setFilter] = useState(null)
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const [getBooks, result] = useLazyQuery(ALL_BOOKS)
    const [getGenres, result2] = useLazyQuery(ALL_GENRES)

    useEffect(() => {
        if (result.data) {
            const newBooks = result.data.allBooks
            setBooks(newBooks)
        }
        if (result2.data) {
            const allGenres = result2.data.allGenres
            setGenres(allGenres)
        }
    }, [result, result2]) // eslint-disable-line

    if (!result.called) {
        getBooks()
    }

    if (!result2.called) {
        getGenres()
    }

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading</div>
    }

    const filterBooks = (event) => {
        const filterValue = event.target.value
        if (filterValue === 'clear') {
            setFilter(null)
            getBooks()
        } else {
            setFilter(filterValue)
            getBooks({ variables: { genres: [filterValue] } })
        }
    }

    return (
        <div>
            <h2>books</h2>
            {filter !== null
                ? <div>in genre {filter}</div>
                : null}
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
            </th>
                        <th>
                            published
            </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                {genres.map(genre =>
                    <button key={genre} value={genre} onClick={filterBooks}>{genre}</button>
                )}
            </div>
            <div>
                <button value={'clear'} onClick={filterBooks}>Clear</button>
            </div>
        </div>
    )
}

export default Books
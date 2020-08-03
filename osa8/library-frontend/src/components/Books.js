import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'

const Books = (props) => {

    const [filter, setFilter] = useState(null)
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const [getBooks, result] = useLazyQuery(ALL_BOOKS)
    const result2 = useQuery(ALL_GENRES)

    useEffect(() => {
        if (result.data) {
            const newBooks = result.data.allBooks
            setBooks(newBooks)
        }
        if (result2.data) {
            console.log(result2)
            const allBooks = result2.data.allBooks
            setGenres([].concat.apply([], allBooks.map(book => book.genres)))
        }
    }, [result, result2]) // eslint-disable-line

    if (!result.called) {
        getBooks()
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
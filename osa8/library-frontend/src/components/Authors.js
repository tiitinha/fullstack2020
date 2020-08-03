
import React from 'react'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import BirthyearForm from './BirthyearForm'

const Authors = (props) => {

    const result = useQuery(ALL_AUTHORS)

    if (result.loading) {
        return (
            <div>loading</div>
        )
    }
    
    const authors = result.data.allAuthors

    if (!props.show) {
        return null
    }


    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
            </th>
                        <th>
                            books
            </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {localStorage.getItem('book-user-token') === null
                ? null
                : <BirthyearForm authors={authors} />
            }
        </div>
    )
}

export default Authors

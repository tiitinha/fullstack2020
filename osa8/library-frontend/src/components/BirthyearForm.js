import React, { useState } from 'react'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const BirthyearForm = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')


    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        onError: (error) => {
            console.log(error.graphQLErrors[0])
        },
        refetchQueries: [{ query: ALL_AUTHORS }]
    })


    const submit = (event) => {
        event.preventDefault()
        updateAuthor({ variables: { name, setBornTo: parseInt(born) } })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                        <option key='-' value={null}>-</option>{authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )

}

export default BirthyearForm
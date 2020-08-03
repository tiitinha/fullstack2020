import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN, CURRENT_USER } from '../queries'

const Login = ({ setUser, setPage, ...props }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    const result2 = useQuery(CURRENT_USER, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setUser(result.data.login.user)
            localStorage.setItem('book-user-token', token)
            setUsername('')
            setPassword('')
            setPage('authors')
        }
        if (result2.data) {
            const user = result2.data.me
            setUser(user)
        }
    }, [result.data, result2.data]) // eslint-disable-line

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )

}

export default Login
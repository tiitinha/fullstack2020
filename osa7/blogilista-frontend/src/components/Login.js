import Notification from './Notification'
import React, { useState } from 'react'
import Notification from './Notification'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            setUsername('')
            setPassword('')
            dispatch(login(user))
            dispatch(notifyWith(`${user.name} welcome back!`))
            storage.saveUser(user)
            history.push('/')
        } catch (exception) {
            dispatch(notifyWith('wrong username/password', 'error'))
        }
    }

    return (
        <div>
            <h2>login to application</h2>

            <Notification notification={notification} />

            <form onSubmit={handleLogin}>
                <div>
                    username
        <input
                        id='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
        <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id='login'>login</button>
            </form>
        </div>
    )
}

export default Login
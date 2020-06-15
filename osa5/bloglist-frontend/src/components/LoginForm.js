import React from 'react'

const LoginForm = ({ handleLogin, username, usernameChange, password, passwordChange}) => {
    return(
        <>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={usernameChange}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={passwordChange}
                />
            </div>
            <button type="submit">login</button>
        </form>
        </>
    )
}

export default LoginForm
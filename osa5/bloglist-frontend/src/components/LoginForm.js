import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, usernameChange, password, passwordChange }) => {
    return(
        <>
            <h1>log in to application</h1>
            <form id='login-form' onSubmit={handleLogin}>
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
                <button id='login-button' type="submit">login</button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    usernameChange: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}


export default LoginForm
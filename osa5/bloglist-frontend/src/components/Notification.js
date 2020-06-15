import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }

    if (error) {

        const errorStyle = {
            color: 'red',
            background: 'pink',
            fontSze: 16,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }

        return (
            <div className='error' style={errorStyle}>
                {message}
            </div>
        )
    } else {
        const addStyle = {
            color: 'green',
            background: 'lightgreen',
            fontSze: 16,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }

        return (
            <div className='add' style={addStyle}>
                {message}
            </div>
        )
    }
}

export default Notification
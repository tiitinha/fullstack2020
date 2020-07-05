var timeoutId = null

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: message
        })

        await clearTimeout(timeoutId)
        timeoutId = await setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, time * 1000)
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}
 const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default notificationReducer
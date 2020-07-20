import usersService from '../services/users'

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
}

export const getAllUsers = () => {
    return async dispatch => { 
        const data = await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data
        })
    }
}

export default usersReducer
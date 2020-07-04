export const setFilter = (filterValue) => {
    return {
        type: 'SET_FILTER',
        data: {
            filter: filterValue
        }
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data.filter
        default:
            return state
    }
}

export default filterReducer
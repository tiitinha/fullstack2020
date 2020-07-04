import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const voteAnecdote = anecdote => {
    return async dispatch => {
        const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
        dispatch({
            type: 'VOTE_ANECDOTE',
            data: votedAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'VOTE_ANECDOTE':
            const id = action.data.id
            const anecdoteToVote = state.find(a => a.id === id)
            const changedAnecdote = {
                ...anecdoteToVote, votes: anecdoteToVote.votes + 1
            }
            const changedState = state.map(anecdote => anecdote.id !== id
                ? anecdote
                : changedAnecdote)
            return changedState.sort((a, b) => b.votes - a.votes)
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export default anecdoteReducer
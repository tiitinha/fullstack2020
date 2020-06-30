const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'GOOD':
            const newGood = state.good + 1
            return {
                good: newGood,
                bad: state.bad,
                ok: state.ok
            }
        case 'OK':
            const newOk = state.ok + 1
            return {
                good: state.good,
                bad: state.bad,
                ok: newOk
            }
        case 'BAD':
            const newBad = state.bad + 1
            return {
                good: state.good,
                bad: newBad,
                ok: state.ok
            }
        case 'ZERO':
            return {
                good: 0,
                bad: 0,
                ok: 0
            }
        default: return state
    }

}

export default counterReducer
const INITIAL_STATE = {list: []}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'BILLING_CYCLES_FETCHED':
            return {...state, list: action.payload.data}    //resultado do request é  .data
        default:
            return state
    }
}
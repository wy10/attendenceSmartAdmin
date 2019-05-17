

//这是reducer
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'add_adminInfo':
            return {
                ...state,
                admin:action.value
            }
        default:
            return state;
    }
}
export default reducer
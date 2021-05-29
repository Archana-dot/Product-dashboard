const initialState = { objects: null }

function addCard(state = initialState, action) { 
    switch (action.type) {
        case "ADD_CARD":
            return Object.assign({}, state, { objects : action.payload });
        default:
            return state;
    }
};
export default addCard;
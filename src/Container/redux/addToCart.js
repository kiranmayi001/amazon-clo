let redux = require('redux')


let initialState = {
    quantity: 10
}
let mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "addToCart":
            return { ...state, quantity: state.quantity + action.payload }
        default: return { ...state }
    }
}


let globalStore = redux.createStore(mainReducer)

module.exports = globalStore

console.log(globalStore.getState())
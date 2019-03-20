import {combineReducers} from 'redux'
import {getBuyOrderData, getSellOrderData, getFinalPriceOrderData} from '../json/'

const buyOrders = (state = getBuyOrderData([]), action) => {
    switch(action.type){
        case 'CHANGE_BUY_ORDER':
        let data = getBuyOrderData(state);
            return data
        default:
            return state
    }
}
const sellOrders = (state = getSellOrderData([]), action) => {
    switch (action.type) {
        case 'CHANGE_SELL_ORDER':
        let data = getBuyOrderData(state);
            return data
        default:
            return state
    }
}
const finalPrice = (state = {color: 'green', state: getFinalPriceOrderData()}, action) => {
    switch (action.type) {
        case 'CHANGE_PRICE':
            let changeData = getFinalPriceOrderData();
            return {
                color: state.state.price < changeData.price ? 'red' : 'green',
                state: changeData
            }
        default:
            return state
    }
}

const todo = combineReducers({
    finalPrice,
    buyOrders,
    sellOrders
});

export default todo
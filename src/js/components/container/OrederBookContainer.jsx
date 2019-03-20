import {connect } from "react-redux"
import { OrderBook, FinalPriceComponent } from "../component/OrderBook.jsx";
import { changeBuyBooks, changeSellBooks, changeFinalPrice } from "../../actions";

const buyOrderStateToProps = (state) => {
    return {
        orders: state.buyOrders,
        bookType: 'buy'
    };
}

const sellOrderStateToProps = (state) => {
    return {
        orders: state.sellOrders,
        bookType: 'sell'
    };
}

const finalPriceStateToProps = (state) => {
    return {
        finalPrice: state.finalPrice
    };
}

const buyOrderDispatchToProps = (dispatch) => {
    return {
        changeBooks: () => {
            dispatch(changeBuyBooks());
        }
    }
}

const sellOrderDispatchToProps = (dispatch) => {
    return {
        changeBooks: () => {
            dispatch(changeSellBooks());
        }
    }
}

const finalPriceDispatchToProps = (dispatch) => {
    return {
        changeFinalPrice: () => {
            dispatch(changeFinalPrice());
        }
    }
}

export const BuyOrederBookContainer = connect(
         buyOrderStateToProps,
         buyOrderDispatchToProps
       )(OrderBook);

export const SellOrederBookContainer = connect(
         sellOrderStateToProps,
         sellOrderDispatchToProps
       )(OrderBook);

export const FinalPriceContainer = connect(
         finalPriceStateToProps,
         finalPriceDispatchToProps
       )(FinalPriceComponent);

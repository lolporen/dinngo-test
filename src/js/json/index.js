import {default as buyOrder}  from './buyOrder.json';
import {default as sellOrder}  from './sellOrder.json';
import {default as transactions}  from './transactions.json'
const dataJson = {
    Buy: buyOrder,
    Sell: sellOrder,
    FinalPrice: transactions
}

const doOrdersTotal = (data) => {
    let total = 0;
    data.forEach((object) => {
        total += parseFloat(object.total)
    })
    return total
}

let buy_total = doOrdersTotal(dataJson.Buy);
let sell_total = doOrdersTotal(dataJson.Sell);

const splitData = (data) => {
    let pointArray = [];
    let dataArray = data.split(".");
    let firstPoint = dataArray[0] + ".";

    pointArray.push(firstPoint);
    for (let i = 0; i < 3; i++) {
        if (i === 2){
            pointArray.push(dataArray[1].substr(i * 3, 3).substring(0, 1));
            pointArray.push(dataArray[1].substr(i * 3, 3).substring(1));
        }else{
            pointArray.push(dataArray[1].substr(i * 3, 3));
        }
    }
    return pointArray.filter(Boolean)
}

const doPercent = (type, newOrder, data) => {
    if (type === 'buy') {
        return ((parseFloat(newOrder.total) + parseFloat(data.total)) / buy_total) * 1000
    } else {
        return ((parseFloat(newOrder.total) + parseFloat(data.total)) / sell_total) * 1000
    }
}

const doOrderData = (data) => {
    return data.map((object, index) => {
        return {
            price: splitData(object.price),
            amount: object.amount,
            total: splitData(object.total),
            state: object.state ? true : false,
            percent: object.percent ? object.percent : 0
        }
    })
}

const getRandom = function (n) {
    return Math.floor(Math.random() * n);
};

const getRandomArrayElements = function (orignalData, orderData, type) {
    let randon = getRandom(8);
    let orderRandon = getRandom(orderData.length);
    let newOrder = orderData[orderRandon];
    orignalData.splice(randon, 1, newOrder);
    return orignalData.map((object) => {
        let newObject = {
            price: Array.isArray(object.price) ? object.price.join('') : object.price,
            amount: object.amount,
            total: Array.isArray(object.total) ? object.total.join('') : object.total,
            state: object.state ? true : false
        };
        newObject['percent'] = doPercent(type, newOrder, newObject);
        return newObject
    });
}


export const getBuyOrderData = (orignalData) => {
    let newOrderData = orignalData.length === 0 ? dataJson.Buy.slice(0, 8) : getRandomArrayElements(orignalData, dataJson.Buy, "buy");
    let orderData = newOrderData.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price)
    });
    return doOrderData(orderData)
}

export const getSellOrderData = (orignalData) => {
    let newOrderData = orignalData.length === 0 ? dataJson.Buy.slice(0, 8) : getRandomArrayElements(orignalData, dataJson.Sell, "sell");
    let orderData = newOrderData.sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price)
    });
    return doOrderData(orderData)
}

export const getFinalPriceOrderData = () => {
    let finalPriceLength = dataJson.FinalPrice.length - 1;
    let random = getRandom(finalPriceLength);
    return dataJson.FinalPrice[random]
}
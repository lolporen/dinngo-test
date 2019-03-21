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

const doPercent = (type, orders) => {
    let totalData = type === 'Buy' ? buy_total : sell_total;
    let showOrderTotal = 0;
    orders.forEach((object) => {
        showOrderTotal += parseFloat(object.total);
    });
    return (showOrderTotal / totalData) * 1000
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

let isStart = true;
let buyOrderData = [] ;
let sellOrderData = [];
let buyOrderIndex = 7;
let sellOrderIndex = 7;

const getNextElements = function (type, data) {
    let ordersData;
    let newOrderData;
    switch (type){
        case 'Buy':
            if (data.length === 0) {
                ordersData = dataJson.Buy.slice(0, 8);
                buyOrderIndex++;
            }else{
                newOrderData = dataJson.Buy[buyOrderIndex];
                buyOrderData.shift();
                buyOrderData.push(newOrderData);
                ordersData = buyOrderData;
                buyOrderIndex++;
            }
            break;
        case 'Sell':
            if (data.length === 0) {
                ordersData = dataJson.Sell.slice(0, 8);
                sellOrderIndex++;
            } else {
                newOrderData = dataJson.Sell[sellOrderIndex];
                sellOrderData.shift();
                sellOrderData.push(newOrderData)
                ordersData = sellOrderData;
                sellOrderIndex++;
            }
            break;
    }
    ordersData = ordersData.map((object, index) => {
        object['percent'] = doPercent(type, ordersData.slice(index))
        return object
    });
    type === "Buy" ? buyOrderData = ordersData : sellOrderData = ordersData;
    return ordersData
}

export const getBuyOrderData = (data) => {
    let orderData = getNextElements("Buy", data).sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price)
    });
    return doOrderData(orderData)
}

export const getSellOrderData = (data) => {
    let orderData = getNextElements("Sell", data).sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price)
    });
    return doOrderData(orderData)
}

export const getFinalPriceOrderData = () => {
    let finalPriceLength = dataJson.FinalPrice.length - 1;
    let random = getRandom(finalPriceLength);
    return dataJson.FinalPrice[random]
}
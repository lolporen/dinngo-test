import React from "react";
import { BuyOrederBookContainer, SellOrederBookContainer, FinalPriceContainer } from "../container/OrederBookContainer.jsx";

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    renderOrders(orders) {
        return orders.map((object, index) => {
            return (
                <TableContent
                    ColumnData={object} key={index}
                />
            );
        })
    }
    renderFinalPrice() {
        return (
            <div className="final-price">
                <span className={`${"price"} ${this.finalPrice.color}`}>{this.finalPrice.state.price}</span>
                <span className="usd-price">{'≈USD $' + this.finalPrice.state.USD}</span>
            </div>
        );
    }
    render() {
        return (
            <div className="table-container">
                <div className="table-row">
                    <div className='data-bar'>
                        <div className="colume-price">Price</div>
                        <div className="colume-amount">Amount</div>
                        <div className="colume-total">Total</div>
                    </div>
                </div>
                <div className="table-line" />
                <SellOrederBookContainer />
                <FinalPriceContainer />
                <BuyOrederBookContainer />
            </div>
        );
    }
}

export { TableComponent }


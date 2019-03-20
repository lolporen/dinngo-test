import React from "react"
import cs from "classnames";

function getRandomTime() {
    return Math.floor(Math.random() * (3000 - 500 + 1)) + 500;
};

class TableContent extends React.Component {
    constructor(props) {
        super(props);
        this.columnData = props.ColumnData;
    }
    componentWillReceiveProps(nextProps) {
        this.columnData = nextProps.ColumnData;
    }
    splitNumber(columnData) {
        return columnData.map((value, index) => {
            let className = {};
            className["group_" + index] = true;
            if (this.props.ColumnData.state){
                className["gray"] = columnData[3] !== undefined && index !== 4 ? columnData[4] !== '00' : false;
            }else{
                className["gray"] = false;
                className["white"] = true;
            }
            
            return <span key={index} className={cs(className)}>{value}</span>;
        })
    }
    renderColumnContent () {
        let columns = ["Price", "Amount", "Total"];
        return columns.map((value, index) => {
            let className = value.toLowerCase();
            let columnData = this.columnData[className];
            return (
                <div className={"colume-" + className} key={index}>
                    {value !== 'Amount' ? this.splitNumber(columnData) : columnData} 
                </div>
            );
        });
    }
    render () {
        return (
            <div className="table-row">
                <div className='bar-chart' style={{ width: this.columnData.percent}}></div>
                <div className='data-bar'>
                    {this.renderColumnContent()}
                </div>
            </div>
        );
    }
}

class OrderBook extends React.Component {
    constructor(props) {
        super(props);
        this.orders = props.orders;
        this.bookType = props.bookType;
        this.changeBooks = props.changeBooks;
    }
    componentDidMount() {
        setTimeout(this.changeBooks, getRandomTime());
    }
    componentWillReceiveProps(nextProps) {
        this.orders = nextProps.orders;
    }
    componentDidUpdate() {
        setTimeout(this.changeBooks, getRandomTime());
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
    render() {
        return (
            <div className={this.bookType + "-orders"}>
                {this.renderOrders(this.orders)}
            </div>
        );
    }
}

class FinalPriceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.finalPrice = props.finalPrice;
        this.changeFinalPrice = props.changeFinalPrice;
    }
    componentDidMount () {
        setTimeout(this.changeFinalPrice, getRandomTime());
    }
    componentWillReceiveProps(nextProps) {
        
        this.finalPrice = nextProps.finalPrice;
    }
    componentDidUpdate () {
        setTimeout(this.changeFinalPrice, getRandomTime());
    }
    render() {
        return (
            <div className="final-price">
                <span className={`${"price"} ${this.finalPrice.color}`}>{this.finalPrice.state.price}</span>
                <span className="usd-price">{'≈USD $' + this.finalPrice.state.USD}</span>
            </div>
        );
    }
}

export { OrderBook, FinalPriceComponent }
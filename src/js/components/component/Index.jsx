import React from 'react';
import DinngoHeader from "./DinngoHeader.jsx";
import { TableComponent } from "./TableComponent.jsx";

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <DinngoHeader />
                <div className="table-block">
                    <div className="table-title"> {"ORDER BOOK"} </div>
                    <TableComponent />
                </div>
            </div>
        );
    }
}

export { Index };
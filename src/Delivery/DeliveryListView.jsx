import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliveryActions } from '../actions';
import { MDBDataTable } from "mdbreact";

class DeliveryListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            delivery: []
        }
    }

    componentDidMount() {
        this.props.getAll();
    }


    render() {
        const { delivery } = this.props;

        const data = {
            columns: [
                {
                    label: "Delivery ID",
                    field: "id",
                    sort: "asc",
                    width: 150
                },
                {
                    label: "Customer Type",
                    field: "customerType",
                    sort: "asc",
                    width: 200
                },
                {
                    label: "Delivery Status",
                    field: "deliveryStatus",
                    sort: "asc",
                    width: 200
                },
                {
                    label: "Expected Delivery Time",
                    field: "expectedDeliveryTime",
                    sort: "asc",
                    width: 250
                },
                {
                    label: "Time To Reach Destination (in mins)",
                    field: "timeToReachDestination",
                    sort: "asc",
                    width: 150
                }
            ],
            rows: this.props.delivery != null ? this.props.delivery.items : []
        };

        return (
            <div>
                <Link to="/" className="btn goto-home">Go back to Home</Link>
                <br /><br /><br /><br />
                {delivery.loading && <em>Loading deliveries...</em>}
                {delivery.error && <span className="text-danger">ERROR: {delivery.error}</span>}
                {delivery.items &&
                   
                   <div className="container">
                        <div className="col-md-12">
                            <h2 className="text-center">Online Delivery Business</h2>
                            <h5 className="sign-in-sub-title">Search and monitor for a particular delivery</h5>
                            <br /><br /><br /><br />
                            <Link to="/adddelivery" className="btn add-new-button">ADD NEW</Link>

                            <div id="data-table">
                                <MDBDataTable                                    
                                    small                                    
                                    data={data}
                                    noBottomColumns
                                    displayEntries={false}
                                    searchLabel=" "
                                    barReverse
                                    bordered
                                    info={false} />
                        </div>
                        </div>
                    </div>

                }
            </div>

        );
    }
}

function mapState(state) {
    const { delivery } = state;
    return { delivery };
}

const actionCreators = {
    getAll: deliveryActions.getAll
}

const connectedDeliveryListView = connect(mapState, actionCreators)(DeliveryListView);
export { connectedDeliveryListView as DeliveryListView };
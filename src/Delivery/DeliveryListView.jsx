import React from 'react';
import { connect } from 'react-redux';
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
                    label: "Time To Reach Destination",
                    field: "timeToReachDestination",
                    sort: "asc",
                    width: 150
                }
            ],
            rows: this.props.delivery != null ? this.props.delivery.items : []
        };

        return (
            <div>
                {delivery.loading && <em>Loading deliveries...</em>}
                {delivery.error && <span className="text-danger">ERROR: {delivery.error}</span>}
                {delivery.items &&
                    <MDBDataTable striped bordered hover data={data} />
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
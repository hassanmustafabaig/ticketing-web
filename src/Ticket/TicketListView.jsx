import React from 'react';
import { connect } from 'react-redux';
import { ticketActions } from '../actions';
import { MDBDataTable } from "mdbreact";

class TicketListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ticket: []
        }
    }

    componentDidMount() {
        this.props.getAll();
    }

    render() {
        const { ticket } = this.props;

        const data = {
            columns: [
                {
                    label: "Ticket ID",
                    field: 'id',
                    sort: "asc",
                    width: 150
                },                
                {
                    label: "Priority",
                    field: "priority",
                    sort: "asc",
                    width: 200
                },
                {
                    label: "Satus",
                    field: "ticketStatus",
                    sort: "asc",
                    width: 250
                }
            ],
            rows: this.props.ticket != null ? this.props.ticket.items : []
        };

        return (
            <div>
                {ticket.loading && <em>Loading deliveries...</em>}
                {ticket.error && <span className="text-danger">ERROR: {ticket.error}</span>}
                {ticket.items &&
                    <MDBDataTable striped bordered hover data={data} />
                }
            </div>

        );
    }
}

function mapState(state) {
    const { ticket } = state;
    return { ticket };
}

const actionCreators = {
    getAll: ticketActions.getAll
}

const connectedTicketListView = connect(mapState, actionCreators)(TicketListView);
export { connectedTicketListView as TicketListView };
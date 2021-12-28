import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                    label: "Sequence",
                    field: 'sequence', 
                    sort: "asc",                  
                    width: 150
                },
                {
                    label: "Ticket ID",
                    field: 'id',                   
                    width: 150
                },
                {
                    label: "Priority",
                    field: "priority",                    
                    width: 200
                },
                {
                    label: "Satus",
                    field: "ticketStatus",                   
                    width: 250
                }
            ],
            rows: this.props.ticket != null ? this.props.ticket.items : []
        };

        return (
            <div>
                <Link to="/" className="btn goto-home">Go back to Home</Link>
                <br /><br /><br /><br />
                {ticket.loading && <em>Loading tickets...</em>}
                {ticket.error && <span className="text-danger">ERROR: {ticket.error}</span>}
                {ticket.items &&

                    <div className="container">
                        <div className="col-md-12">
                            <h2 className="text-center">Online Delivery Business</h2>
                            <h5 className="sign-in-sub-title">Search and monitor for a particular delivery</h5>
                            <br /><br /><br /><br />                            

                            <div id="data-table">
                                <MDBDataTable    
                                    order={['sequence', 'asc' ]}                                
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
    const { ticket } = state;
    return { ticket };
}

const actionCreators = {
    getAll: ticketActions.getAll
}

const connectedTicketListView = connect(mapState, actionCreators)(TicketListView);
export { connectedTicketListView as TicketListView };
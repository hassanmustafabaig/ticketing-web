import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MainView extends React.Component {
    componentDidMount() {
        
    }

    render() {
        const { user, users } = this.props;          
        let userData = JSON.parse(localStorage.getItem('user'));

        return (
            <div>
            <div className="col-md-6 col-md-offset-3">                        
            <p>You're logged in successfully.</p>
            <p>This application was developed and being managed by <strong>Hassan Mustafa Baig</strong>. This app is build upon react using redux and the back-end is powered by spring boot and keyclock</p>

            <p>
                {userData.roles.includes('Order_Manager') == true ? <Link to="/delivery">View Deliveries</Link> : null}
                {userData.roles.includes('Ticketing_Agent') == true ? <Link to="/ticket">View Tickets</Link> : null}
               
            </p>
        </div>
        <div className="col-md-6 col-md-offset-3">      
        <Link to="/login">Logout</Link>
        </div>
        </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
   
}

const connectedMainView = connect(mapState, actionCreators)(MainView);
export { connectedMainView as MainView };
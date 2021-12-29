import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions, userActions } from '../actions';
import { PrivateRoute } from '../components';
import { TicketListView } from '../Ticket';
import { DeliveryListView } from '../Delivery';
import { DeliveryFormView } from '../Delivery';
import { LoginView } from '../Login';
import { MainView } from '../Home';

class App extends React.Component {    

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        }); 

       this.state = {
            timerID: "refresh-token-timer"
        }
    }

    componentDidMount() {

        this.state.timerID = setInterval(
            () => this.props.getRefreshToken(),
            (60000 * 1)
          );
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
     }

    render() {
        const { alert } = this.props;      

        return (           
            <div className="container">
                <div className="col-md-12">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <br/><br/><br/><br/>
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={MainView} />
                            <Route path="/login" component={LoginView} />
                            <Route path="/delivery" component={DeliveryListView} />
                            <Route path="/adddelivery" component={DeliveryFormView} />                            
                            <Route path="/ticket" component={TicketListView} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>            
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    getRefreshToken: userActions.getRefreshToken
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
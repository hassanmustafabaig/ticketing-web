import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class LoginView extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();
        //clearInterval("refresh-token-timer");

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    handleClick(e){
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="container mt-3 col-sm-offset-2">
            <div className="col-md-6">            
                <h2 className="text-center">Hello, welcome back</h2>
                <h5 className="sign-in-sub-title">Sign into your account here.</h5>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label className="labels" htmlFor="username">Email address</label>
                        <input type="text" className="form-control form-control-lg" name="username" placeholder="placeholder" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Email address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label className="labels" htmlFor="password">Password</label>
                        <input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="placeholder" value={password} onChange={this.handleChange} />
                        <i className="far fa-eye" id="togglePassword" onClick={this.handleClick}></i>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    
                    <br/>
                    <Link to="/register" className="forgot-password">Forgot password?</Link>
                    
                    <br/><br/><br/><br/>                    
                    <button className="btn login-button">SIGN IN</button>                        
                    
                </form>
            </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginView = connect(mapState, actionCreators)(LoginView);
export { connectedLoginView as LoginView };
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deliveryActions } from '../actions';
import DateTimePicker from 'react-datetime-picker';



class DeliveryFormView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            delivery: {
                currentDistanceFromDestination: 0,
                customerType: '',
                deliveryStatus: '',
                expectedDeliveryTime: new Date(),
                riderRating: 0,
                timeToPrepareFood: 0,
                timeToReachDestination: 0
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { delivery } = this.state;
        this.setState({
            delivery: {
                ...delivery,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { delivery } = this.state;
        if (delivery.currentDistanceFromDestination &&
            delivery.customerType &&
            delivery.deliveryStatus &&
            delivery.expectedDeliveryTime &&
            delivery.timeToPrepareFood &&
            delivery.timeToReachDestination) {

            let d = {currentDistanceFromDestination : delivery.currentDistanceFromDestination,
                customerType : delivery.customerType, 
                deliveryStatus : delivery.deliveryStatus,                
                riderRating : delivery.riderRating,
                timeToPrepareFood : delivery.timeToPrepareFood,
                timeToReachDestination : delivery.timeToReachDestination,
                expectedDeliveryTime : delivery.expectedDeliveryTime.getFullYear() + '-' 
                                        + delivery.expectedDeliveryTime.getMonth() + '-'
                                        + delivery.expectedDeliveryTime.getDate() + 'T'
                                        + delivery.expectedDeliveryTime.getHours() + ':'
                                        + delivery.expectedDeliveryTime.getMinutes() + ':'
                                        + delivery.expectedDeliveryTime.getSeconds()}

            this.props.addDelivery(d);
        }
    }

    render() {
        const { adding } = this.props;
        const { delivery, submitted } = this.state;        
        let _this = this;
        const handleChangeEDT = (_value) => {
            _this.handleChange({target: {name: 'expectedDeliveryTime', value: _value }});
        }

        return (
            <div className="container">
                <div className="col-md-12">
                    <h2>Add Delivery</h2>
                    <form name="form">
                        <div className={'form-group' + (submitted && !delivery.currentDistanceFromDestination ? ' has-error' : '')}>
                            <label htmlFor="currentDistanceFromDestination">Current Distance From Destination</label>
                            <input type="number" min={1} className="form-control" name="currentDistanceFromDestination" value={delivery.currentDistanceFromDestination} onChange={this.handleChange} />
                            {submitted && !delivery.currentDistanceFromDestination &&
                                <div className="help-block">Current dustance from destination is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !delivery.customerType ? ' has-error' : '')}>
                            <label htmlFor="customerType">Customer Type</label>
                            <select value={this.state.delivery.customerType} className="form-control" name="customerType" onChange={this.handleChange}>
                                <option value="0">VIP</option>
                                <option value="1">LOYAL</option>
                                <option value="2">NEW</option>
                                </select>
                            {submitted && !delivery.customerType &&
                                <div className="help-block">Customer type is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !delivery.deliveryStatus ? ' has-error' : '')}>
                            <label htmlFor="deliveryStatus">Delivery Status</label>
                            <select value={this.state.delivery.deliveryStatus} className="form-control" name="deliveryStatus" onChange={this.handleChange}>
                                <option value="0">Order Received</option>
                                <option value="1">Order Preparing</option>
                                <option value="2">Order Picked-up</option>
                                <option value="3">Irder Delivered</option>
                                </select>
                            {submitted && !delivery.deliveryStatus &&
                                <div className="help-block">Delivery status is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !delivery.expectedDeliveryTime ? ' has-error' : '')}>
                            <label htmlFor="expectedDeliveryTime">Expected Delivery Time</label>
                            <DateTimePicker className="form-control" format="y-MM-dd h:mm:ss a" value={delivery.expectedDeliveryTime} name="expectedDeliveryTime" onChange={handleChangeEDT} />                            
                            {submitted && !delivery.expectedDeliveryTime &&
                                <div className="help-block">Expected delivery time is required</div>
                            }
                        </div>                        
                        <div className={'form-group' + (submitted && !delivery.riderRating ? ' has-error' : '')}>
                            <label htmlFor="riderRating">Rider rating</label>
                            <input type="number" min={1} max={5} className="form-control" name="riderRating" value={delivery.riderRating} onChange={this.handleChange} />
                            {submitted && !delivery.riderRating &&
                                <div className="help-block">Rider rating is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !delivery.timeToPrepareFood ? ' has-error' : '')}>
                            <label htmlFor="timeToPrepareFood">Time To Prepare Food</label>
                            <input type="number" min={1} className="form-control" name="timeToPrepareFood" value={delivery.timeToPrepareFood} onChange={this.handleChange} />
                            {submitted && !delivery.timeToPrepareFood &&
                                <div className="help-block">Time to prepare food is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !delivery.timeToReachDestination ? ' has-error' : '')}>
                            <label htmlFor="timeToReachDestination">Time To Reach Destination</label>
                            <input type="number" min={1} className="form-control" name="timeToReachDestination" value={delivery.timeToReachDestination} onChange={this.handleChange} />
                            {submitted && !delivery.timeToReachDestination &&
                                <div className="help-block">Time to reach destination is required</div>
                            }
                        </div>

                        <div className="row center-row">
                        <div className="form-group">
                            <button className="btn add-new-form-button" onClick={this.handleSubmit}>ADD</button>
                            {adding}
                            <Link to="/delivery" className="btn add-new-form-button">CANCEL</Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { adding } = state.delivery;
    return { adding };
}

const actionCreators = {
    addDelivery: deliveryActions.addDelivery
}

const connectedDeliveryFormView = connect(mapState, actionCreators)(DeliveryFormView);
export { connectedDeliveryFormView as DeliveryFormView };
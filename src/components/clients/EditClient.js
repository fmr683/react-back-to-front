import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';


 class EditClient extends Component {

    constructor(props) {
        super(props);

        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onSubmit = e => {
        e.preventDefault();

        const { client, firestore } = this.props;


        const updClient = {
            firstName: this.firstNameInput.current.vlaue,
            lastName: this.lastNameInput.current.vlaue,
            email: this.emailInput.current.vlaue,
            phone: this.phoneInput.current.vlaue,
            balance: this.balanceInput.current.vlaue || 0,
        }

        firestore.update({ collection: 'clients', doc: client.id}, updClient)
        .then(() => this.props.history.push('/'))
    }


    render() {
        const { client } = this.props;
        const { disableBalanceOnEdit } = this.props.settings;

        if (client) {
            return ( <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
 
                <div className="card">
                    <div className="card-header">
                        Edit Client 
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstname">First name</label>
                                <input type="text" className="form-control" ref={this.firstNameInput} name="firstName" minLength="2" required  defaultValue={client.firstName} />
                            </div>
 
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" className="form-control" ref={this.lastNameInput} name="lastName" minLength="2" required  defaultValue={client.lastName} />
                            </div>
 
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" ref={this.emailInput} name="email" minLength="2" required  defaultValue={client.email} />
                            </div>
 
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control"  ref={this.phoneInput} name="phone" minLength="2" required  defaultValue={client.phone} />
                            </div>
 
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input disabled={disableBalanceOnEdit} type="text" className="form-control" ref={this.balanceInput}  name="balance" required  defaultValue={client.balance} />
                            </div>
 
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
             </div>);
        } else {
            return <Spinner/>
        }
    }
        
}

EditClient.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { 
            collection: 'clients', storeAs: 'client', doc: props.match.params.id

        }
    ]),
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings: settings
    }))
)(EditClient);
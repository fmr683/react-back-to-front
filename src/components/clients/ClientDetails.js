import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class ClientDetails extends Component {
    
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: 0
    }
  
    onChange = e => this.setState({[e.target.name]: e.target.value});

    balanceSubmit = e => {
        e.preventDefault();

        const { client, firestore } = this.props;

        const { balanceUpdateAmount } = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }

        firestore.update({ collection: 'clients', doc: client.id}, clientUpdate);
    }

    onDelete = () => {
        const { client, firestore, history } = this.props;

        firestore.delete({ collection: 'clients', doc: client.id})
        .then(() => history.push('/'))
    }

    render() {

        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;

        let balanceForm = '';
        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control" name="balanceUpdateAmount" placeholder="Add new Balance" value={balanceUpdateAmount} 
                        onChange={this.onChange} />
                        <div className="input-group-append">
                            <input type="submit" value="Update" className="btn btn-outline-dark" />
                        </div>
                    </div>
                </form>
            )
        } else {
            balanceForm = null
        }

        if (client) {
            return (
               <div className="row">
                   <div className="col-md-6">
                       <Link to="/" className="btn btn-link">
                           Back to Dash Board
                       </Link>
                
                   </div>
                   <div className="col-md-6">
                       <div className="btn-group float-right">
                           <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                               Edit
                           </Link>
                           <button className="btn btn-delete" onClick={this.onDelete}>Delete</button>
                       </div>
                   </div>

                   <hr/>

                   <div className="card">
                       <h3 className="card-header">
                           {client.firstName} {client.lastName}
                       </h3>
                       <div className="card-body">
                           <div className="row">
                               <div className="cold-md-8 col-sm-6">
                                   <h4>Client Id: <span className="text-secondary">{client.id}</span></h4>
                               </div>
                               <div className="cold-md-4 col-sm-6">
                                   <h3>Balance: ${parseFloat(client.balance).toFixed(2)}
                                    <a href="#!" onClick={() => {
                                        this.setState({
                                            showBalanceUpdate: !this.state.showBalanceUpdate
                                        })
                                    }}>

                                        <i className="fas fas-pencil-alt"></i>
                                    </a>
                                   </h3>
                                   {balanceForm}

                                </div>
                           </div>
                       </div>

                       <hr/>

                       <ul>
                           <li>Email: {client.email}</li>
                           <li>Phone: {client.phone}</li>
                       </ul>
                   </div>
               </div>
            )
        } else {
            return <Spinner/>
        }

    
    }
}

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { 
            collection: 'clients', storeAs: 'client', doc: props.match.params.id

        }
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);

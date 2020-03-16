import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom'

 class Contact extends Component {

    state = {
        showContactInfo: true
    }

    onShowClick = () => {
        this.setState({
            showContactInfo: !this.state.showContactInfo
        })
    }

    onDeleteClick = async (id, dispatch) => {

        try {
            await axios.delete('https://jsonplaceholder.typicode.com/users/' + id)
        
            dispatch({ type: 'DELETE_CONTACT', payload: id})
        } catch (e) {
            dispatch({ type: 'DELETE_CONTACT', payload: id}) // we do this here because we don't actually deal with real database
        }
       
    }


    render() {

        const {id, name, email, phone} = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                        <h4>{name} <i onClick={this.onShowClick} className="fad fa-arrow-circle-down"></i>
                        <i className="fas fa-times" style={{ cursor: 'pointer', float: 'right', color: 'red'}} onClick={this.onDeleteClick.bind(this, id, dispatch)} />
                        <Link to={`/contact/edit/${id}`}>
                            <i style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'black',
                                marginRight: '1rem'
                            }} className="fa fa-pencil-alt">Edit</i>
                        </Link>
                        </h4>
                        {showContactInfo ? 
                        <ul className="list-group">
                            <li className="list-group-item">Email: {email}</li>
                            <li className="list-group-item">Phone:  {phone}</li>
                        </ul>
                        : ''}
                    </div>
                    )
                }}
            </Consumer>
        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired
}
export default Contact;
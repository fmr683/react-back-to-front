import React, { Component } from 'react'
import { Consumer } from '../../context';
import { v4 as uuidv4 } from 'uuid';
import  TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';


class EditContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res =  await axios.get('https://jsonplaceholder.typicode.com/users/'+id)
    
        const contact =res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();

        const { name, email, phone} = this.state;


        if (name == "") {
            this.setState({
                errors: {
                    name: "Name cannot be empty"
                }
            })
            return;
        }

        if (phone == "") {
            this.setState({
                errors: {
                    phone: "Phone cannot be empty"
                }
            })
            return;
        }

        if (email == "") {
            this.setState({
                errors: {
                    email: "Email cannot be empty"
                }
            })
            return;
        }

        const newContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;

        const res = await axios.put('https://jsonplaceholder.typicode.com/users/'+id, newContact)
       
        dispatch({ type: 'UPDATE_CONTACT', payload: res.data})
     
       

        this.setState({
            name: '',
            phone: '',
            email: '',
            errors: {}
        });

        this.props.history.push('/');
    }

    render() {
       const {name, phone, email, errors} = this.state;
       return (<Consumer>
           {value => {
               const {dispatch} = value;

               return (
                <div className="card mb-3">
                    <div className="card-header">
                        Edit Contact
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit.bind(this, dispatch)}>

                            <TextInputGroup error={errors.name} name="name" label="Name" placeholder="Enter name.." value={name} onChange={this.onChange} />
                           
                            <TextInputGroup error={errors.phone} name="phone" label="Phone" placeholder="Enter phone.." value={phone} onChange={this.onChange} />

                            <TextInputGroup error={errors.email} name="email" label="Email" placeholder="Enter email.." value={email} onChange={this.onChange} />
                            
                            <input type="submit" value="Edit Contact" className="btn btn-light btn-block" />
                        </form>
                    </div>
                </div>
            )
           }}
          
       </Consumer>);
      
    }
}
export default EditContact
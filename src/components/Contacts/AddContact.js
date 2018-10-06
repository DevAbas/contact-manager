import React, { Component } from 'react';
import uuid from 'uuid';
import { Consumer } from '../../context';
import TextInputGroup from '../Layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  

  onSubmit = async (dispatch, e) => {
    e.preventDefault()
    const { name, email, phone} = this.state;

    if(name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if(email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if(phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = {
      id: uuid(),
      name, 
      email,
      phone
    }

    const res = await axios.post('https://jsonplaceholder.typicode.com/users/', newContact)
    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data
    })

    // Clear state
    this.setState({
      name: '',
      email: '',
      phone: ''
    });

    this.props.history.push('/')
  } 

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup 
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChangeHandler}
                    error={errors.name}
                  />
                  <TextInputGroup 
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChangeHandler}
                    error={errors.email}
                  />
                  <TextInputGroup 
                    label="Phone"
                    type="text"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChangeHandler}
                    error={errors.phone}
                  />
                  <button className="btn btn-light btn-block">Add Contact</button>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact;

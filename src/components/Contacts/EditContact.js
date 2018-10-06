import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../Layout/TextInputGroup';
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
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
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

    const { id } = this.props.match.params;
    const updtContact = {
      name,
      email,
      phone
    }

    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updtContact);

    dispatch({
      type: 'EDIT_CONTACT',
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
                  <button className="btn btn-light btn-block">Update Contact</button>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default EditContact;

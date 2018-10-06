import React, {  Component} from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';
import PropTypes from 'prop-types';
import axios from 'axios';

class Contact extends Component {

  state = {
    showContactInfo: false
  }

  static propTypes = {
    contact: PropTypes.object.isRequired  
  }

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id
      })
    } catch(err) {
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id
      })
    }
  }

  render() {
    const { id, name, email, phone } = this.props.contact;    
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>{name} 
                <i 
                  onClick={() => { this.setState({ showContactInfo: !this.state.showContactInfo }) }} 
                  style={{ cursor: 'pointer' }}
                  className="fas fa-sort-down"
                />
                <i 
                  className="fas fa-trash"
                  style={{ float: 'right', cursor: 'pointer', color: 'orangered' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i 
                    className="fas fa-pencil-alt" 
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  ></i>
                </Link>
              </h4>
              {
                showContactInfo ? 
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul> : null
              }
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Contact;
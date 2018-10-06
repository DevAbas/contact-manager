import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
    <div className="container">
      <a href="https://devabas.github.io/contact-manager/" className="navbar-brand">
        {props.branding}
      </a>
      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-home" /> Home
            </Link>
            <Link to="/contact/add" className="nav-link">
              <i className="fas fa-plus" /> Add
            </Link>
            <Link to="/about" className="nav-link"> About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  branding: PropTypes.string.isRequired
}

export default Header;

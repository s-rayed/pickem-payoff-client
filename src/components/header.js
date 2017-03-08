import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return(
        <li>
          <Link to="/signout">Sign Out</Link>
        </li>
      )
    } else {
      return [
        <li key={1}>
          <Link to="/signin">Sign In</Link>          
        </li>,
        <li key={2}>
          <Link to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return(
      <div className="header">
        <div>
          <ul className="header-navigation">
            { this.renderLinks() }
          </ul>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
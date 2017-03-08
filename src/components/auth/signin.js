import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    // Log in user
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return(
        <div className="signInError">
          <strong>OOPS!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return(
      <div className="container">
        <div className="signInContainer">
          <h3 className="signInTitle">Please Sign In</h3>
          <form className="signInForm form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset>
              <input type="text" placeholder='Email' {...email} /><br /><br />
            </fieldset>
            <fieldset>
              <input type="password" placeholder="password" {...password} /><br /><br />
            </fieldset>
            { this.renderAlert() }
            <button className="signInButton btn btn-success btn-sm">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
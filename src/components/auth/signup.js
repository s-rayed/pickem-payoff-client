import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit({ email, password, passwordConfirm }) {
    this.props.signupUser({ email, password, passwordConfirm });
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
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return(
      <div className="container">
        <div className="signInContainer">
          <h3 className="signInTitle">Please Sign Up</h3>
          <form className="signInForm form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset>
              <input type="text" placeholder="Email" {...email}/><br /><br />
            </fieldset>
            <fieldset>
              <input type="password" placeholder="password" {...password} /><br /><br />
            </fieldset>
            <fieldset>
              <input type="password" placeholder="confirm password" {...passwordConfirm} /><br /><br />
            </fieldset>
            { this.renderAlert() }
            <button className="signInButton btn btn-success btn-sm">Sign Up</button>
          </form>
        </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords MUST match'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);

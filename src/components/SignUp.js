import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { signup, startSign } from '../actions/sign';
import { signup, clearAuthState } from '../actions/auth';
// import { login } from '../actions/auth';
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      repassword: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePassChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleRePassChange = (e) => {
    this.setState({
      repassword: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, repassword } = this.state;

    // if (email && password == repassword) {
    if (email && name && password && repassword) {
      // this.props.dispatch(startSign());
      this.props.dispatch(signup(name, email, password, repassword));
    }

    // if (email && password) this.props.dispatch(login(email, password));
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Register</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="name"
            placeholder="UserName"
            onChange={this.handleNameChange}
            value={this.state.name}
            required
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            onChange={this.handleEmailChange}
            value={this.state.email}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            onChange={this.handlePassChange}
            value={this.state.password}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleRePassChange}
            value={this.state.repassword}
            required
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Signing Up...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Sign Up
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sign: state.sign,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(SignUp);

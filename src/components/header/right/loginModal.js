import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class RegisterModal extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(event) {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  }
  
  handlePassChange(event) {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    // alert(`Username: ${this.state.username} Password: ${this.state.password} `);
    const body = {username: this.state.username, password: this.state.password};
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(() => window.location.reload(false));
    event.preventDefault();
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
      <div className = 'modal'>
        <div className="register">login...</div>
        <form onSubmit={this.handleSubmit} method='POST' action='/signin'>
            <input type="text" value={this.state.username} onChange={this.handleUserChange} placeholder="username" className="input"/>
            <input type="password" value={this.state.password} onChange={this.handlePassChange} placeholder="password" className="input"/>
          <div className="btns">
            <input type="submit" value="Submit" className = 'button' />
            <div onClick={() => this.props.toggleLoginModal()} className = 'button'>Close</div>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterModal;
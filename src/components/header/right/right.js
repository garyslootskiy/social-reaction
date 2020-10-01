import React, { Component } from 'react';

class Right extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className = 'right'>
        <div className = 'button' onClick={() => this.props.toggleRegisterModal()}>register</div>
        <div className = 'button' onClick={() => this.props.toggleLoginModal()}>login</div>
        <div className = 'button' onClick={() => this.props.logOut()}>logout</div>
      </div>
    );
  }
}

export default Right;
import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className = 'header'>
        <div className = 'title'>Social Reaction</div>
        <div className = 'button' onClick={() => this.props.testFunc()}>TestFunc</div>
      </div>
    );
  }
}

export default Header;
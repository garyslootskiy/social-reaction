import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className = 'header'>
        <span>HEADER</span>
        <div className = 'button' onClick={() => this.props.refreshNewsItems()}>SHOW NEWS ITEMS</div>
      </div>
    );
  }
}

export default Header;
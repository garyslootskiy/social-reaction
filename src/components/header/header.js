import React, { Component } from 'react';
import Right from './right/right.js'


class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className = 'header'>
        {/* <div className = 'title'>Social Reaction</div> */}
        <div className = 'title'>
         <span className = "blue">C</span>onversation
        </div>
        <Right  toggleRegisterModal={this.props.toggleRegisterModal}  toggleLoginModal={this.props.toggleLoginModal} headerState={this.props.headerState} logOut={this.props.logOut}/>
      </div>
    );
  }
}

export default Header;
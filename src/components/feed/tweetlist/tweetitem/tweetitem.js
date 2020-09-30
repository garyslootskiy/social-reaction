import React, { Component } from 'react';

class TweetItem extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className = "tweetitem">
        {this.props.details.text}
      </div>
    );
  }
}

export default TweetItem;
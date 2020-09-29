import React, { Component } from 'react';
import TweetItem from './tweetitem/tweetitem.js'

class TweetList extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className = 'tweetlist'>
        <span>TweetList for id#{this.props.state.currentId}</span>
        <TweetItem />
        <TweetItem />
      </div>
    );
  }
}

export default TweetList;
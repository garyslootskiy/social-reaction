import React, { Component } from 'react';
import NewsList from './newslist/newslist.js'
import TweetList from './tweetlist/tweetlist.js'

class Feed extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div  className = 'feed'>
        <NewsList state={this.props.state} showTweetItems={this.props.showTweetItems}/>
        <TweetList state={this.props.state}/>
      </div>
    );
  }
}

export default Feed;
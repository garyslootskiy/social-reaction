import React, { Component } from 'react';
import TweetItem from './tweetitem/tweetitem.js'

class TweetList extends Component {
  constructor() {
    super();
  }
  render() {
    const tweetArray = [];
    if(this.props.state.currentId >= 0) {
      const currentId = this.props.state.currentId;
      if(this.props.state.newsItems[currentId].tweets) {
        const currentTweetTopic = this.props.state.newsItems[currentId].tweets.data;
        currentTweetTopic.forEach((tweet, index) => {
          tweetArray.push(<TweetItem details={tweet} key={`tweet#${index}`} />)
        });
      } else {
        tweetArray.push(<div className = "tweetitem">No Related Tweets Found</div>)}
    }

    return (
      <div className = 'tweetlist'>
        <span>TweetList for id#{this.props.state.currentId}</span>
        {tweetArray}
      </div>
    );
  }
}

export default TweetList;
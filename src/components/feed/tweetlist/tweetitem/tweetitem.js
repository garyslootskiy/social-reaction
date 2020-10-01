import React, { Component } from 'react';

class TweetItem extends Component {
  constructor() {
    super();
  }
  render() {
    if(this.props.details.lang != 'en') {
      return null;
    }
    // console.log(this.props.details);
    // console.log(this.props.authors);
    const tweet = this.props.details;
    // tweet.author_id , tweet.created_at, tweet.lang, tweet.text
    tweet.text = tweet.text.slice(0,240);
    tweet.author = this.props.authors[tweet.author_id].name.slice(0,25);
    tweet.username = this.props.authors[tweet.author_id].username;
    tweet.profileImage = this.props.authors[tweet.author_id].image;
    tweet.date = new Date(tweet.created_at);
    return (
      <div className="tweet-container">
        <div className = "image"><img src = {tweet.profileImage} /></div>
        <div className = "tweetitem">
        <div className = "author">{tweet.author} <span className="at">@{tweet.username}</span></div>
          <div className = "text">{tweet.text}</div>
        </div>
      </div>
    );
  }
}

export default TweetItem;
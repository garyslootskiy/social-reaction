import React, { Component } from 'react';

class NewsItem extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className = "newsitem" onClick={() => this.props.showTweetItems(this.props.details.id)}>
        <span>{`${this.props.details.id}. ${this.props.details.title}`}</span>
      </div>
    );
  }
}

export default NewsItem;
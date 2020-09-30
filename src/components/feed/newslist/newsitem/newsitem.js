import React, { Component } from 'react';

class NewsItem extends Component {
  constructor() {
    super();
  }
  render() {
    const details = this.props.details;
    const source = details.source.name;
    const {id , title, author, description, url, urlToImage, publishedAt} = details;
    const date = new Date(publishedAt);
    return (
      <div className = "newsitem" onClick={() => this.props.showTweetItems(this.props.details.id)}>
        <span>{`${title} by ${author} at ${source}`}</span>
      </div>
    );
  }
}

export default NewsItem;
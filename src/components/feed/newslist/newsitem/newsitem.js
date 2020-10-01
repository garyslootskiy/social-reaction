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
    const classStore = (this.props.currentId == this.props.index) ? 'active-newsitem' : 'newsitem';
    
    return (
      <div className = {classStore} onClick={() => this.props.showTweetItems(this.props.details.id)}>
        <img src={urlToImage}></img>
        <div><strong>{title}</strong><br/>{` at ${source}`}</div>
      </div>
    );
  }
}

export default NewsItem;
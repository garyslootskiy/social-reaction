import React, { Component } from 'react';
import NewsItem from './newsitem/newsitem.js'

class NewsList extends Component {
  constructor() {
    super();
  }
  render() {
    const newsItems = [];
    this.props.state.newsItems.forEach((article, index) => {
      article.id = index;
      newsItems.push(<NewsItem details={article} key={`article#${index}`} showTweetItems={this.props.showTweetItems} currentId={this.props.state.currentId} index={index}/>)
    });
    return (
      <div className = "newslist">
        {newsItems}
      </div>
    );
  }
}

export default NewsList;
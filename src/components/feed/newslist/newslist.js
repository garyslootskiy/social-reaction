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
      newsItems.push(<NewsItem details={article} key={`article#${index}`} showTweetItems={this.props.showTweetItems}/>)
    });
    return (
      <div className = "newslist">
        <span>NEWSLIST</span>
        {newsItems}
      </div>
    );
  }
}

export default NewsList;
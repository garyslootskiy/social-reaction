import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Header from './components/header/header.js'
import Feed from './components/feed/feed.js'

import './styles.scss';
// IMPORT COMPONENTS
// import Header from './components/Header/index.jsx';
// import Content from './components/Content/index.jsx';
/*
// IMAGE USE
// Import
import LOGO from '<path-to-file>/logo.png';
// Usage
<img src={LOGO} alt="Page Logo" />
*/

class App extends Component {
  constructor() {
    super();

    this.state = {
      newsItems: [],
      currentId: 0
    }

    this.refreshNewsItems = this.refreshNewsItems.bind(this);
    this.showTweetItems = this.showTweetItems.bind(this);
  }

  refreshNewsItems() {
    fetch('/api/newsitems')
    .then(res => res.json())
    .then((data) => {
      return this.setState({
        ...this.state,
        newsItems: data,
      });
    })
    .catch(err => console.log('App.refreshNewsItems: ', err));
  }

  showTweetItems(id) {
    return this.setState({
      ...this.state,
      currentId: id
    });
  }

  render() {
    return (
      <div className = "app">
        <Header refreshNewsItems={this.refreshNewsItems}/>
        <Feed state={this.state} showTweetItems={this.showTweetItems}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
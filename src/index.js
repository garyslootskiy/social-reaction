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
    }

    this.refreshNewsItems = this.refreshNewsItems.bind(this);
    this.showTweetItems = this.showTweetItems.bind(this);
    this.testFunc = this.testFunc.bind(this);
  }

  refreshNewsItems() {
    let newsItems;
    let fetchArray = [];

    fetch('/api/newsitems')
    .then(res => res.json())
    .then((data) => {
        newsItems = data;

        newsItems.forEach(article => {
          const title = article.title;
          const regex = /(^(?:\S+\s+\n?){1,4})/;
          const twitterString = title.match(regex)[0].replace(/[^a-zA-Z0-9 ]/g, "");
          const twitterStringNotArray = twitterString.split(" ");
          const notElem  = `-${twitterStringNotArray[3]} -RT lang:en`;
          twitterStringNotArray.splice(3,1);
          const twtterStringFinal = twitterStringNotArray.join(" ");
          const query = ' &tweet.fields=text&tweet.fields=created_at&expansions=author_id&expansions=attachments.media_keys&tweet.fields=public_metrics&tweet.fields=lang'
          
          console.log(`${twtterStringFinal}${notElem}`);

          let promiseItem = new Promise((resolve, reject) => {
            fetch(`/api/tweetitems/${twtterStringFinal}${notElem}`)
            .then(res => res.json())
            .then((data) => {
              if(data.data) {
                article.tweets = data;
              } else {
                article.tweets = false;
              }
              resolve();
            })
            .catch(err => console.log('App.refreshNewsItems-tweets: ', err));
          }); 
          fetchArray.push(promiseItem);
        });
      })
    .then(() => {
      Promise.all(fetchArray)
      .then(
        this.setState({
          ...this.state,
          newsItems
        }) 
      )
    })
    .catch(err => console.log('App.refreshNewsItems-news: ', err));
    
  }

  showTweetItems(id) {
    return this.setState({
      ...this.state,
      currentId: id
    });
  }

  testFunc() {
    return this.setState({
      ...this.state
    });
  }

  componentDidMount() {
    this.refreshNewsItems();
  }

  render() {
    return (
      <div className = "app">
        <Header testFunc={this.testFunc}/>
        <Feed state={this.state} showTweetItems={this.showTweetItems}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
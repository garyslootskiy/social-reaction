import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Header from './components/header/header.js'
import Feed from './components/feed/feed.js'
import UserInfo from './components/userinfo/userInfo.js'
import RegisterModal from './components/header/right/registerModal.js';
import LoginModal from './components/header/right/loginModal.js';
import Cookies from 'js-cookie';

import './styles.scss';
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
      showRegisterModal: false,
      showLoginModal: false,
      cookies: Cookies.get(),
      userInfo: {topics:[]},
      tweetAuthors: {}
      // currentId: 0
    }

    this.refreshNewsItems = this.refreshNewsItems.bind(this);
    this.showTweetItems = this.showTweetItems.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.removeQuery = this.removeQuery.bind(this);
  }

  toggleLoginModal() {
    return this.setState({
      ...this.state,
      showLoginModal: !this.state.showLoginModal,
      showRegisterModal: false
    });
  }

  removeQuery(index) {
    const userInfo = Object.assign(this.state.userInfo);
    const _id = userInfo._id;
    userInfo.topics.splice(index, 1);
    const topics = userInfo.topics;


    const body = {topics, _id};
    fetch('/db/addquery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(()=>{
        this.props.getUserInfo();
      });

      this.setState({
        ...this.state,
        userInfo,
      });
  }

  logOut() {
    fetch('/logout')
      .then(() => {
        window.location.reload(false);
      });
  }

  getUserInfo() {
    const cookies = this.state.cookies;
    fetch('/db/getuserinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cookies),
    })
    .then(res => res.json())
    .then((data) => {
      return this.setState({
        ...this.state,
        userInfo: data
      });
    })
    .catch(err => console.log('userInfo.getUserInfo ', err));
  }

  toggleRegisterModal() {
    return this.setState({
      ...this.state,
      showRegisterModal: !this.state.showRegisterModal,
      showLoginModal: false
    });
  }

  refreshNewsItems(topic = 0) {
    let newsQuery;

    if(topic === 0) newsQuery = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=878d534fe8594e45b4d535b8cf6e5788';
    else {
      newsQuery = `https://newsapi.org/v2/everything?qInTitle=${topic}&apiKey=878d534fe8594e45b4d535b8cf6e5788`;
    }

    fetch(`/api/newsitems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newsQuery }),
    })
    .then(res => res.json())
    .then((newsItems) => {
      this.setState({
        ...this.state,
        ssid: Cookies.get(),
        newsItems,
        currentId: 0
      }) 
      this.showTweetItems(0);
    })
    .catch(err => console.log('App.refreshNewsItems-news: ', err));
    
  }

  showTweetItems(id) {
      const newsItems = Object.assign(this.state.newsItems);
      let tweetAuthors = {};
      const article = newsItems[id];
      const title = article.title;
      const regex = /(^(?:\S+\s+\n?){1,6})/;
      const twitterString = title.match(regex)[0].replace(/[^a-zA-Z0-9 ]/g, "");
      const twitterStringNot = title.replace(/[^a-zA-Z0-9 ]/g, "");
      const twitterStringArray = twitterString.split(" ");
      const twitterStringNotArray = twitterStringNot.split(" ");
      const notElem  = `-${twitterStringNotArray[twitterStringNotArray.length-1]} -RT `;
      twitterStringArray.splice(3,2);
      const twitterStringFinal = `${twitterStringArray[0]} ${twitterStringArray[1]} (${twitterStringArray[2]} OR ${twitterStringArray[3]}) `;
      console.log(`${twitterStringFinal}${notElem}`);
      fetch(`/api/tweetitems/${twitterStringFinal}${notElem}&max_results=100&tweet.fields=text,created_at,public_metrics,entities,lang&expansions=author_id`)
      .then(res => res.json())
      .then((data) => {
        if(data.tweets) {
          article.tweets = data.tweets;
          tweetAuthors = data.authors;
        } else {
          article.tweets = false;
        }
        return this.setState({
          ...this.state,
          newsItems,
          currentId: id,
          tweetAuthors
        })
      })
      .catch(err => console.log('App.refreshNewsItems-tweets: ', err));
  }

  componentDidMount() {
    this.getUserInfo();
    this.refreshNewsItems();
  }

  render() {
    return (
      <div className = "app">
        <Header toggleRegisterModal={this.toggleRegisterModal} toggleLoginModal={this.toggleLoginModal} headerState={{'showRegisterModal': this.state.showRegisterModal } } logOut={this.logOut}/>
        <UserInfo cookies={this.state.cookies} userInfo={this.state.userInfo} getUserInfo={this.getUserInfo} refreshNewsItems={this.refreshNewsItems} removeQuery={this.removeQuery}/>
        <Feed state={this.state} showTweetItems={this.showTweetItems}/>
        <RegisterModal show={this.state.showRegisterModal} toggleRegisterModal={this.toggleRegisterModal} />
        <LoginModal show={this.state.showLoginModal} toggleLoginModal={this.toggleLoginModal} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
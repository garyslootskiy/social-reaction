import React, { Component } from 'react';
import Query from './query/query.js'


class UserInfo extends Component {
  constructor() {
    super();

    this.state = {
      queryValue: '',
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      queryValue: event.target.value,
    });
  }

  handleSubmit(event) {
    const _id = this.props.userInfo._id;
    const topics = this.props.userInfo.topics;
    topics.push(this.state.queryValue);


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
        queryValue: '',
      });
    event.preventDefault();
  }

  render() {
    const cookies = this.props.cookies;
    if(!cookies.ssid) {
     return null;
    }
    const userInfo = this.props.userInfo;
    const queryOpts = [];
    if(userInfo.topics.length > 0) {
      userInfo.topics.forEach((topic, index) => {
      queryOpts.push(<div><Query id={`query#${index}`} topic={topic} refreshNewsItems={this.props.refreshNewsItems} removeQuery={this.props.removeQuery} index={index}/></div>);
      })
    }

    return (
      <div className="userinfo-master">
        <div className="username">{userInfo.username}</div>
        <div className="userInfo">
          <div>
            <Query topic="US Headlines"  refreshNewsItems={this.props.refreshNewsItems} />
          </div>
          {queryOpts}
          <div className="add-query">
          <form onSubmit={this.handleSubmit} method='POST' action='/signup'>
            <label>
              <input type="text" className="query-input-box" value={this.state.queryValue} onChange={this.handleChange} placeholder="add query"/>
            </label>
            <input type="submit" value="ADD" className="query-submit-btn"/>
          </form>
            </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
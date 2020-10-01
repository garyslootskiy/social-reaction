import React, { Component } from 'react';

class Query extends Component {
  constructor() {
    super();
  }
  render() {
    const topic = (this.props.topic == "US Headlines") ? 0 : this.props.topic;
    return (
      <div className="queryItem" onClick={() => {
        this.props.refreshNewsItems(topic);
      }}>
        {this.props.topic} 
        <Removal removeQuery={this.props.removeQuery} index={this.props.index} />
      </div>
    );
  }
}

class Removal extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="removeItem" onClick={() => this.props.removeQuery(this.props.index)}>
        -
      </div>
    );
  }
}

export default Query;
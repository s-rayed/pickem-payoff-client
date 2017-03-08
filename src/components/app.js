import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="mainBody">
          {this.props.children}
        </div>
        <footer className="footer">Footer</footer>
      </div>
    );
  }
}

import React from 'react';
// import Radium from 'radium';

var Author = React.createClass({
  copyright: function () {
    if (this.props.copyrightYear) {
      return (
        <time dateTime="2016">{this.props.copyrightYear}</time>
      );
    } else {
      return '';
    }
  },
  render: function () {
    return (
      <footer>
        <p>
          &copy; {this.copyright()} <span><a rel="author" href={this.props.authorUrl}>{this.props.author}</a></span>
        </p>
      </footer>
    );
  }
});

module.exports = Author;

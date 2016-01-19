import React from 'react';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      name: 'World'
    };
  },

  render: function () {
    return (
      <span>{this.props.name}</span>
    );
  }
});

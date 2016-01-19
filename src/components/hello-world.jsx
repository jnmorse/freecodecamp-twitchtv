import React from 'react';
import Person from './person.jsx';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    isPerson: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      name: 'World'
    };
  },

  getInitialState: function () {
    return {
      value: 0
    };
  },

  _addByOne: function () {
    this.setState({
      value: this.state.value + 1
    });
  },

  render: function () {
    var greeting = 'World';

    if (this.props.isPerson) {
      greeting = (<Person name={this.props.name} />);
    }

    return (
      <div>
        <h1>Hello {greeting}</h1>
        {this.state.value} <button onClick={this._addByOne}>Click Me</button>
      </div>
    );
  }
});

import React from 'react';

export default React.createClass({
  getInitialState: function () {
    return {
      avatar: '',
      online: false
    };
  },

  componentDidMount: function () {
    if (this.props.data.stream) {
      this.setState({
        online: true
      });
    }
  },

  showOnlineUser: function () {
    return (
      <section className="col lg6">
        <header>
          <img style={{ maxWidth: '72px'}} className="responsive-img circle" src={ this.props.data.stream.channel.logo} alt={this.props.name + '\'s logo'}/>
          <h3 className="right">{this.props.name}</h3>
        </header>
      </section>
    );
  },

  render: function () {
    if (this.state.online) {
      return this.showOnlineUser();
    }
    return (
      <section className="col lg4">
        <header>
          <h4>{this.props.name}</h4>
        </header>
      </section>
    );
  }
});

import React from 'react';

export default React.createClass({
  showOnlineChannel: function () {
    return (
      <a href={this.props.data.stream.channel.url}>
        {this.props.data.stream.channel.display_name}</a>
    );
  },

  showOfflineChannel: function () {
    return (
      <p>{this.props.name}</p>
    );
  },

  render: function () {
    var channel = Boolean(this.props.data.stream) ? this.showOnlineChannel() : this.showOfflineChannel();

    return (
      <div>
        {channel}
      </div>
    );
  }
});

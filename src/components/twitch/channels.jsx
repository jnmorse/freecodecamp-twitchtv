import React from 'react';
import Channel from './channel.jsx';

export default React.createClass({
  displayChannel: function (channel) {
    return (
      <Channel key={channel.id} name={channel.name} data={channel.data} />
    );
  },

  render: function () {
    var channels = this.props.list.map(this.displayChannel);
    return (
      <div className="row">
        {channels}
      </div>
    );
  }
});

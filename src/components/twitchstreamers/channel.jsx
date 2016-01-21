import React from 'react';

export default React.createClass({
  getInitialState: function () {
    return {
      showVideo: false,
      showText: 'Show Stream'
    };
  },

  onlineState: function () {
    var stream = this.props.data.stream;

    if (this.state.showVideo) {
      return (
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            src={'http://player.twitch.tv/?channel=' + stream.channel.name}
            height="720"
            width="1280"
            frameborder="0"
            scrolling="no"
            allowfullscreen>
          </iframe>
        </div>
      );
    }

    return (
      <img src={stream.preview.large} alt="Stream Preview" className="img-responsive" />
    );
  },

  toggleStream: function (e) {
    e.preventDefault();

    this.setState({
      showVideo: this.state.showVideo ? false : true,
      showText: (this.state.showVideo) ? 'Show Stream' : 'Hide Stream'
    });
  },

  showOnlineChannel: function () {
    var stream = this.props.data.stream;

    return (
      <section className="col-sm-12">
        <div className="panel panel-default">
          <header>
            <h4 onClick={this.props.showStream}>{stream.channel.status} <small>{stream.game}</small></h4>
          </header>
          <div className="pannel-body">
              {this.onlineState()}
            </div>
          <footer>
            <p>
              <a className="pull-right" onClick={this.toggleStream} href="#">{this.state.showText}</a>
              <a target="_blank" href={stream.channel.url}>
              {stream.channel.display_name}</a>
            </p>
          </footer>
        </div>
      </section>
    );
  },

  channelImage: function () {
    var data = this.props.data;

    if (Boolean(data.profile_banner)) {
      return (
        <img src={data.profile_banner} style={{ maxHeight: '446px' }} alt="Profile Banner" className="img-responsive" />
      );
    } else if (Boolean(data.logo)) {
      return (
        <img src={data.logo} alt="Logo" style={{ maxHeight: '446px' }} className="img-responsive" />
      );
    } else {
      return (
        <img src="http://placehold.it/1339x446" alt="Logo" className="img-responsive" />
      );
    }
  },

  showOfflineChannel: function () {
    var data = this.props.data;

    return (
      <section className="col-xs-12 col-sm-6">
        <div className="panel panel-default">
          <header className="panel-heading">

            <h4><a target="_blank" href={data.url}>{data.display_name}</a></h4>
          </header>
          <figure>
            {this.channelImage()}
            <figcaption>Offline</figcaption>
          </figure>
        </div>
      </section>
    );
  },

  showDeletedChannel: function () {
    return (
      <section className="col-xs-12 col-sm-6">
        <div className="panel panel-danger">
          <header className="panel-heading">
            <h4>{this.props.name}</h4>
          </header>
          <p className="pannel-body">Deleted Account</p>
        </div>
      </section>
    );
  },

  render: function () {
    /**
     * @todo: Move API Call to main part of app and then pass data
     */
    var channel = '';

    if (this.props.data !== undefined) {
      var online = Boolean(this.props.data.stream);
      channel = Boolean(this.props.data.stream) ? this.showOnlineChannel() : this.showOfflineChannel();
    } else {
      channel = this.showDeletedChannel();
    }

    return (
      <div>
        {channel}
      </div>
    );
  }
});

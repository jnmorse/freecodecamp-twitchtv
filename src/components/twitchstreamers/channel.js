import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVideo: false,
      showText: 'Show Stream'
    };
  }

  static get propTypes() {
    return {
      data: PropTypes.shape({
        stream: PropTypes.shape({
          channel: PropTypes.shape({
            name: PropTypes.string
          })
        })
      }).isRequired,
      name: PropTypes.string.isRequired
    };
  }

  static get defaultProps() {
    return {
      showStream: false
    };
  }

  onlineState() {
    const {
      data: { stream }
    } = this.props;
    const { showVideo } = this.state;

    if (showVideo) {
      return (
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title={`${stream.channel.name}`}
            src={`https://player.twitch.tv/?channel=${stream.channel.name}`}
            height="720"
            width="1280"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <img
        src={stream.preview.large}
        alt="Stream Preview"
        className="img-responsive"
      />
    );
  }

  toggleStream(e) {
    e.preventDefault();

    this.setState(prevState => {
      const showVideo = !prevState.showVideo;
      const showText = showVideo ? 'Hide Stream' : 'Show Stream';

      return { showVideo, showText };
    });
  }

  showOnlineChannel() {
    const {
      data: { stream }
    } = this.props;
    const { showText } = this.state;

    return (
      <section className="col-sm-12 col-md-6">
        <div className="panel panel-default">
          <header>
            <h4>
              {stream.channel.status} <small>{stream.game}</small>
            </h4>
          </header>

          <div className="pannel-body">{this.onlineState()}</div>

          <footer>
            <p>
              <button
                type="button"
                className="pull-right"
                onClick={e => this.toggleStream(e)}
                href="#"
              >
                {showText}
              </button>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={stream.channel.url}
              >
                {stream.channel.display_name}
              </a>
            </p>
          </footer>
        </div>
      </section>
    );
  }

  channelImage() {
    const { data } = this.props;

    if (data.logo) {
      return (
        <img
          src={data.logo}
          alt="Logo"
          style={{ maxHeight: '76px' }}
          className="img-responsive"
        />
      );
    }
    return (
      <img
        src="http://placehold.it/76x76"
        alt="Logo"
        className="img-responsive"
      />
    );
  }

  showOfflineChannel() {
    const { data } = this.props;

    return (
      <section className="col-xs-12 col-md-2">
        <div className="panel panel-default">
          <header className="panel-heading">
            <h4>
              <a target="_blank" rel="noopener noreferrer" href={data.url}>
                {data.display_name}
              </a>
            </h4>
          </header>
          <figure>
            <center>
              {this.channelImage()}
              <figcaption>Offline</figcaption>
            </center>
          </figure>
        </div>
      </section>
    );
  }

  showDeletedChannel() {
    const { name } = this.props;

    return (
      <section className="col-xs-12 col-sm-2">
        <div className="panel panel-danger">
          <header className="panel-heading">
            <h4>{name}</h4>
          </header>
          <center>
            <p className="pannel-body">Deleted Account</p>
          </center>
        </div>
      </section>
    );
  }

  render() {
    let channel = '';
    const { data } = this.props;

    if (data !== undefined) {
      channel = data.stream
        ? this.showOnlineChannel()
        : this.showOfflineChannel();
    } else {
      channel = this.showDeletedChannel();
    }

    return <div>{channel}</div>;
  }
}

export default Channel;

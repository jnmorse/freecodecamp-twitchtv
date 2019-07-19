import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class OnlineChannel extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,

    stream: PropTypes.shape({
      game_id: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      started_at: PropTypes.string.isRequired,
      tag_ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      thumbnail_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      user_id: PropTypes.string.isRequired,
      user_name: PropTypes.string.isRequired,
      viewer_count: PropTypes.number.isRequired
    }).isRequired
  };

  displayIframe() {
    const { login } = this.props;

    const iframeSrc = new URL('https://player.twitch.tv/');

    iframeSrc.searchParams.append('channel', login);
    iframeSrc.searchParams.append('autoplay', false);
    iframeSrc.searchParams.append('muted', false);

    return (
      <iframe
        src={iframeSrc.href}
        width={1080}
        height={720}
        frameBorder="0"
        title="TwitchTV Player"
        style={{ maxWidth: '100%' }}
      />
    );
  }

  render() {
    const {
      display_name: displayName,
      description,
      stream: { thumbnail_url: thumbnailUrl }
    } = this.props;

    const url = thumbnailUrl.replace('{width}', 1080).replace('{height}', 720);

    return (
      <section>
        <header>
          <h2>{displayName}</h2>
        </header>

        <img src={url} alt="Live Stream" />

        <p>{description || 'No Description Provided'}</p>
      </section>
    );
  }
}

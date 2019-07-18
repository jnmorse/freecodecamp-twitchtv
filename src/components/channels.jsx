import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from './ApiProvider';
import styles from './channels.css';

class Channels extends Component {
  static propTypes = {
    channels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        display_name: PropTypes.string.isRequired,
        broadcaster_type: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        offline_image_url: PropTypes.string.isRequired,
        profile_image_url: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        view_count: PropTypes.number.isRequired,

        stream: PropTypes.shape({
          id: PropTypes.string.isRequired,
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
        })
      })
    ).isRequired
  };

  render() {
    const { channels } = this.props;

    return (
      <div className={styles.container}>
        {channels.map(channel => (
          <section key={channel.id} className={styles.section}>
            <a href={`https://twitch.tv/${channel.login}`}>
              <header>
                <h2>{channel.display_name}</h2>
                <img src={channel.profile_image_url} alt="Profile" />
              </header>
            </a>

            <p>{channel.description || 'channel description unavaible'}</p>

            <footer>
              <p>{channel.view_count}</p>
            </footer>
          </section>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ channels, streams }) {
  return { channels, streams };
}

export const ConnectedChannels = connect(mapStateToProps)(Channels);

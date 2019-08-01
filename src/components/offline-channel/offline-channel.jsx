import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './offline-channel.css';

import { DeleteButton } from '../DeleteButton';

export class OfflineChannel extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    offline_image_url: PropTypes.string.isRequired,
    profile_image_url: PropTypes.string.isRequired,
    view_count: PropTypes.number.isRequired,

    stream: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),

    deleteChannel: PropTypes.func.isRequired
  };

  static defaultProps = {
    stream: false
  };

  render() {
    const {
      display_name: displayName,
      profile_image_url: profileImageURL,
      view_count: viewCount,
      description,
      offline_image_url: offlineImageURL,
      stream,
      login,
      deleteChannel
    } = this.props;
    return (
      <section className={styles.section}>
        <a
          href={`https://twitch.tv/${login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <header>
            <h2>{displayName}</h2>
            <img src={offlineImageURL || profileImageURL} alt="Profile" />
          </header>
        </a>

        <p className={styles.description}>
          {description || 'channel description unavaible'}
        </p>

        <footer>
          <p>Status: {stream ? 'Online' : 'Offline'}</p>
          <p>View Count: {viewCount}</p>
          <DeleteButton onDelete={() => deleteChannel(login)}>
            Delete
          </DeleteButton>
        </footer>
      </section>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

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
    }).isRequired,

    game: PropTypes.shape({
      name: PropTypes.string.isRequired,
      box_art_url: PropTypes.string.isRequired
    }).isRequired,

    ShowModal: PropTypes.func.isRequired
  };

  // eslint-disable-next-line max-lines-per-function
  render() {
    const {
      display_name: displayName,
      login,
      description,
      stream: { thumbnail_url: thumbnailUrl, viewer_count: viewerCount, title },
      game: { name: gameName, box_art_url: boxArtUrl },
      ShowModal
    } = this.props;

    const thumbnail = thumbnailUrl
      .replace('{width}', 1080)
      .replace('{height}', 720);
    const boxArt = boxArtUrl.replace('{width}', 90).replace('{height}', 150);

    return (
      <section className={styles.section}>
        <header className={styles.header}>
          <h2>{displayName}</h2>
          <p className={styles.status}>Online</p>
          <p>{title}</p>
        </header>

        <button
          type="button"
          className={styles.preview}
          title="watch stream"
          onClick={() => ShowModal(login, title)}
        >
          <img
            className={styles.previewImage}
            src={thumbnail}
            alt="Live Stream"
          />
        </button>

        <p>{description || 'No Description Provided'}</p>

        <aside className={styles.gameInfo}>
          <img src={boxArt} alt="Box Art" />
          <div>{gameName}</div>
        </aside>

        <footer className={styles.footer}>
          <div># Watching: {viewerCount}</div>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitch.tv/${login}`}
            >
              Watch on TwitchTV
            </a>
          </div>
        </footer>
      </section>
    );
  }
}

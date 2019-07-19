import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

export class StreamModal extends Component {
  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.shape({
      title: PropTypes.string.isRequired,
      channel: PropTypes.string.isRequired,
      visable: PropTypes.bool.isRequired
    }).isRequired
  };

  handleEscape = event => {
    console.log(event);
  };

  // eslint-disable-next-line max-lines-per-function
  render() {
    const {
      showModal: { title, channel, visable },
      hideModal
    } = this.props;

    if (!visable) {
      return null;
    }

    const iframeSrc = new URL('https://player.twitch.tv/');

    iframeSrc.searchParams.append('channel', channel);
    iframeSrc.searchParams.append('autoplay', false);
    iframeSrc.searchParams.append('muted', false);

    return (
      <div id={styles.modal} onClick={() => hideModal()} role="presentation">
        <section
          className={styles.content}
          onClick={event => {
            event.stopPropagation();
          }}
          role="presentation"
        >
          <header>
            <h2>{title}</h2>
          </header>

          <iframe
            src={iframeSrc.href}
            width={1080}
            height={720}
            frameBorder="0"
            title="TwitchTV Player"
            style={{ maxWidth: '100%' }}
          />

          <iframe
            title="Twitch Chat"
            frameBorder="0"
            scrolling="no"
            id="chat_embed"
            src={`https://www.twitch.tv/embed/${channel}/chat`}
            height="500"
            width="350"
          />

          <button type="button" onClick={() => hideModal()}>
            Hide
          </button>
        </section>
      </div>
    );
  }
}

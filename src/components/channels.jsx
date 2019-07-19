import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { OfflineChannel } from './offline-channel';
import { OnlineChannel } from './online-channel/online-channel';

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

  renderOfflineChannels() {
    const { channels } = this.props;

    const offlineChannels = channels.filter(
      channel => Boolean(channel.stream) === false
    );

    return offlineChannels.map(channel => (
      <OfflineChannel key={channel.id} {...channel} />
    ));
  }

  renderOnlineChannels() {
    const onlineChannels = this.props.channels.filter(channel =>
      Boolean(channel.stream)
    );

    return onlineChannels.map(channel => {
      return <OnlineChannel key={channel.id} {...channel} />;
    });
  }

  render() {
    return (
      <>
        <div className={styles.onlineContainer}>
          {this.renderOnlineChannels()}
        </div>

        <div className={styles.container}>{this.renderOfflineChannels()}</div>
      </>
    );
  }
}

function mapStateToProps({ channels }) {
  return { channels };
}

export const ConnectedChannels = connect(mapStateToProps)(Channels);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from './components/ApiProvider';
import { fetchChannels } from './actions/stream-actions';
import { ConnectedChannels as Channels } from './components/channels';

import styles from './app.css';
import { defaultChannels } from './default-channels';

let channels = JSON.parse(localStorage.getItem('jnmorse-twitch-streamers'));

if (!channels) {
  channels = defaultChannels;
  localStorage.setItem(
    'jnmorse-twitch-streamers',
    JSON.stringify(defaultChannels)
  );
}

class App extends Component {
  static propTypes = {
    fetchChannels: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchChannels();
  }

  render() {
    return (
      <>
        <header id={styles.site_header}>
          <h1 className={styles.heading}>Twitch Streamers</h1>
          <p className={styles.subHeading}>
            Keep track of your favorite Twitch Streams
          </p>
        </header>

        <form>
          <label>
            Add a Streamer <input type="text" />
          </label>
        </form>

        <main>
          <Channels />
        </main>

        <footer>
          <p>Joseph Morse</p>
        </footer>
      </>
    );
  }
}

const ConnnectedApp = connect(
  null,
  dispatch => {
    return {
      fetchChannels: async () =>
        dispatch(await fetchChannels(channels, dispatch))
    };
  }
)(App);

export default ConnnectedApp;

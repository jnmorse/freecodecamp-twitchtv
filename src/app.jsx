import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadChannelList } from './actions';
import { ConnectedChannels as Channels } from './components/channels';
import { ConnectedStreamModal as StreamModal } from './components/stream-modal';
import { ConnectedNotification as Notification } from './components/notification';
import { ConnectedAddChannelForm as AddChannelForm } from './components/add-channel-form';
import { Layout } from './components/layout';
import { SEO } from './components/seo';

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
    loadChannelList: PropTypes.func.isRequired,
    showModal: PropTypes.shape({
      visable: PropTypes.bool.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.loadChannelList();
  }

  render() {
    return (
      <Layout>
        <SEO
          title="Home"
          description="Keep track of when your favorite Twitch streamers are online"
          keywords={['twitch', 'status']}
        />

        <AddChannelForm />
        <Notification />
        <StreamModal />
        <Channels />
      </Layout>
    );
  }
}

function mapStateToProps({ showModal }) {
  return { showModal };
}

const ConnnectedApp = connect(
  mapStateToProps,
  { loadChannelList }
)(App);

export default ConnnectedApp;

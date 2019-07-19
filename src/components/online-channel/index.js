import { connect } from 'react-redux';

import { showModal } from '../../actions';

import { OnlineChannel } from './online-channel';

function mapDispatchToProps(dispatch) {
  return {
    ShowModal: (channel, title) => dispatch(showModal(channel, title))
  };
}

export const ConnectedOnlineChannel = connect(
  null,
  mapDispatchToProps
)(OnlineChannel);

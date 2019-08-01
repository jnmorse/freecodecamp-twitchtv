import { connect } from 'react-redux';
import { deleteChannel } from '../../actions';
import { OfflineChannel } from './offline-channel';

export const ConnectedOfflineChannel = connect(
  null,
  { deleteChannel }
)(OfflineChannel);

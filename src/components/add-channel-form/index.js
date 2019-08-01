import { connect } from 'react-redux';
import { AddChannelForm } from './add-channel-form';
import { addChannel } from '../../actions';

export const ConnectedAddChannelForm = connect(
  null,
  { addChannel }
)(AddChannelForm);

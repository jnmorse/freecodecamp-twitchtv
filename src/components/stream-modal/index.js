import { connect } from 'react-redux';

import { StreamModal } from './stream-modal';
import { hideModal } from '../../actions';

function mapStateToProps({ showModal }) {
  return { showModal };
}

export const ConnectedStreamModal = connect(
  mapStateToProps,
  { hideModal }
)(StreamModal);

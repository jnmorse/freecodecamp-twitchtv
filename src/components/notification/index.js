import { connect } from 'react-redux';
import { Notification } from './notification';
import { hideNotification } from '../../actions';

function mapStateToProps({ notification }) {
  return notification;
}

export const ConnectedNotification = connect(
  mapStateToProps,
  { hide: hideNotification }
)(Notification);

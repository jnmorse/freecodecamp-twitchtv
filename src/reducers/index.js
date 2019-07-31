import { combineReducers } from 'redux';
import { channelsListReducer } from './channels-list-reducer';
import { channelsReducer } from './channel-reducer';
import { showModalReducer } from './show-modal';
import { notificationReducer } from './notification-reducer';

export const reducers = combineReducers({
  channels: channelsReducer,
  showModal: showModalReducer,
  channelsList: channelsListReducer,
  notification: notificationReducer
});

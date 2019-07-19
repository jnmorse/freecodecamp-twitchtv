import { combineReducers } from 'redux';
import { channelsListReducer } from './channels-list-reducer';
import { channelsReducer } from './channel-reducer';
import { showModalReducer } from './show-modal';

export const reducers = combineReducers({
  channels: channelsReducer,
  showModal: showModalReducer,
  channelsList: channelsListReducer
});

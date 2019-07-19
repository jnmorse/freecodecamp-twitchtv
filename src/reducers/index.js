import { combineReducers } from 'redux';
import { channelReducer } from './channel-reducer';

export const reducers = combineReducers({
  channels: channelReducer
});

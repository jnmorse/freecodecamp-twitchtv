import { ActionTypes } from './types';
import { defaultChannels } from '../default-channels';
import { fetchChannels } from './stream-actions';

export function loadedChannelList(channels) {
  return {
    type: ActionTypes.LoadChannelListSuccess,
    payload: channels
  };
}

export function loadChannelList() {
  return dispatch => {
    const local = localStorage.getItem('channels');

    if (local) {
      const channels = JSON.parse(local);
      dispatch(loadedChannelList(channels));
      dispatch(fetchChannels(channels));
      return;
    }

    localStorage.setItem('channels', JSON.stringify(defaultChannels));

    dispatch(loadedChannelList(defaultChannels));
    dispatch(fetchChannels(defaultChannels));
  };
}

export function addChannel(channel) {
  return dispatch => {
    dispatch({ type: ActionTypes.AddChannel, payload: channel });
  };
}

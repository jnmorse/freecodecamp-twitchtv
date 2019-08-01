import { ActionTypes } from './types';
import { defaultChannels } from '../default-channels';
import { fetchChannels, fetchChannel } from './stream-actions';

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
  return async dispatch => {
    const action = await dispatch(fetchChannel(channel));

    if ((action.type = ActionTypes.FetchChannelSuccess)) {
      return dispatch({ type: ActionTypes.AddChannel, payload: channel });
    }

    return dispatch({ type: 'ADD_CHANNEL_FAIL' });
  };
}

export function deleteChannel(name) {
  return {
    type: ActionTypes.DeleteChannel,
    payload: name
  };
}

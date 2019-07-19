// import axios from 'axios';
import { users, streams } from '../twitch';
import { ActionTypes } from './types';

// const streamUrl = new URL('')

export async function fetchActiveStreams(channels = []) {
  const search = channels.map(channel => `user_login=${channel.name}`);
  const response = await streams.get(`?${search.join('&')}`);

  return response.data.data;
}

export function fetchChannels(channels = []) {
  return async dispatch => {
    if (channels.length) {
      const search = channels.map(channel => `login=${channel.name}`);
      const response = await users.get(`?${search.join('&')}`);

      const activeStreams = await fetchActiveStreams(channels);

      const data = response.data.data.map(channel => {
        const stream = activeStreams.find(
          activeStream => activeStream.user_id === channel.id
        );

        if (stream) {
          return { ...channel, stream };
        }

        return channel;
      });

      return dispatch({
        type: ActionTypes.FetchChannels,
        payload: data
      });
    }

    return dispatch({
      type: ActionTypes.FetchChannels,
      payload: []
    });
  };
}

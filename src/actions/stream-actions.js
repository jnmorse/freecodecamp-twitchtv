// import axios from 'axios';
import { TwitchAPI } from '../twitch';
import { ActionTypes } from './types';

export async function fetchActiveStreams(channels = []) {
  const search = channels
    .map(channel => `user_login=${channel.name}`)
    .join('&');
  const searchParams = new URLSearchParams(search);

  const response = await TwitchAPI.get('/streams', {
    params: searchParams
  });

  return response.data.data;
}

async function getGameInfo(gameID) {
  const search = await TwitchAPI.get('/games', { params: { id: gameID } });

  return search.data.data[0];
}

export function fetchChannels(channels = []) {
  return async dispatch => {
    if (channels.length) {
      const search = channels.map(channel => `login=${channel.name}`).join('&');
      const searchParams = new URLSearchParams(search);

      const response = await TwitchAPI.get('/users', {
        params: searchParams
      });

      const activeStreams = await fetchActiveStreams(channels);

      const data = await Promise.all(
        response.data.data.map(async channel => {
          const stream = activeStreams.find(
            activeStream => activeStream.user_id === channel.id
          );

          if (stream) {
            const game = await getGameInfo(stream.game_id);

            return { ...channel, stream, game };
          }

          return channel;
        })
      );

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

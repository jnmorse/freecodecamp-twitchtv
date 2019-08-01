// import axios from 'axios';
import { TwitchAPI } from '../twitch';
import { ActionTypes } from './types';

export async function fetchActiveStreams(channels = []) {
  const search = channels.map(channel => `user_login=${channel}`).join('&');
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

export function fetchChannelsSuccess(data) {
  return {
    type: ActionTypes.FetchChannelsSuccess,
    payload: data
  };
}

export function fetchChannelsFail(message) {
  return {
    type: ActionTypes.FetchChannelsFail,
    payload: message
  };
}

export function fetchChannels(channels = []) {
  return async dispatch => {
    if (channels.length) {
      try {
        const search = channels.map(channel => `login=${channel}`).join('&');
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

        if (response.status === 200) {
          return dispatch(fetchChannelsSuccess(data));
        }

        return dispatch(
          fetchChannelsFail('was a problem retrieving from Twitch API')
        );
      } catch (error) {
        return dispatch(fetchChannelsFail(error));
      }
    }

    return dispatch({
      type: ActionTypes.FetchChannels,
      payload: []
    });
  };
}

export function fetchChannel(channel) {
  return async dispatch => {
    try {
      const response = await TwitchAPI.get('/users', {
        params: { login: channel }
      });

      if (response.status === 200) {
        return dispatch({
          type: ActionTypes.FetchChannelSuccess,
          payload: response.data.data[0]
        });
      }

      return dispatch({
        type: ActionTypes.FetchChannelFail,
        payload: 'Could not load channel'
      });
    } catch (error) {
      return dispatch({ type: ActionTypes.FetchChannelFail, payload: error });
    }
  };
}

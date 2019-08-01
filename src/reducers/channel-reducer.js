import { ActionTypes } from '../actions/types';

export const channelsReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FetchChannelsSuccess: {
      return [...state, ...action.payload];
    }

    case ActionTypes.FetchActiveStreams: {
      const updateChannels = state.map(channel => {
        const stream = action.payload.find(
          activeStream => activeStream.user_id === channel.id
        );

        if (stream) {
          return { ...channel, stream };
        }

        return channel;
      });

      return updateChannels;
    }

    case ActionTypes.FetchChannelSuccess: {
      return [...state, action.payload];
    }

    case ActionTypes.DeleteChannel: {
      return state.filter(channel => channel.login !== action.payload);
    }

    default: {
      return state;
    }
  }
};

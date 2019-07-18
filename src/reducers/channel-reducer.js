import { ActionTypes } from '../actions/types';

export const channelReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FetchChannels: {
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

    default: {
      return state;
    }
  }
};

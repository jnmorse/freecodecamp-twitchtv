import { ActionTypes } from '../actions';

export function channelsListReducer(state = [], action = { type: '' }) {
  switch (action.type) {
    case ActionTypes.LoadChannelListSuccess: {
      return action.payload;
    }

    case ActionTypes.AddChannel: {
      const channels = [...state, action.payload];
      localStorage.setItem('channels', JSON.stringify(channels));
      return channels;
    }

    default: {
      return state;
    }
  }
}

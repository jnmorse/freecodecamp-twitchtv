import { ActionTypes } from '../actions';

export const defaultNotificationState = {
  show: false,
  message: '',
  type: ''
};

export function notificationReducer(state = defaultNotificationState, action) {
  switch (action.type) {
    case ActionTypes.FetchChannelsFail: {
      if (action.payload instanceof Error) {
        return {
          show: true,
          message: action.payload.message,
          type: 'error'
        };
      }

      return { show: true, message: action.payload, type: 'error' };
    }

    case ActionTypes.HideNotification: {
      return { ...state, show: false };
    }

    default: {
      return state;
    }
  }
}

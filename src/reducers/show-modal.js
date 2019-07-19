import { ActionTypes } from '../actions';

export function showModalReducer(
  state = { visable: false, channel: '', title: '' },
  action = { type: '' }
) {
  switch (action.type) {
    case ActionTypes.ShowStreamModal: {
      return { ...state, ...action.payload, visable: true };
    }

    case ActionTypes.HideStreamModal: {
      return { ...state, visable: false };
    }

    default: {
      return state;
    }
  }
}

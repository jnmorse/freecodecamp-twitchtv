import { ActionTypes } from './types';

export function showModal(channel, title) {
  return { type: ActionTypes.ShowStreamModal, payload: { channel, title } };
}

export function hideModal() {
  return { type: ActionTypes.HideStreamModal };
}

import { ActionTypes } from './types';

export * from './stream-actions';
export * from './modal-actions';
export * from './channel-list';

export { ActionTypes };

export function hideNotification() {
  return {
    type: ActionTypes.HideNotification
  };
}

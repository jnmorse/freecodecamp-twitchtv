import { ActionTypes } from './types';

export * from './stream-actions';
export * from './modal-actions';

export { ActionTypes };

export function hideNotification() {
  return {
    type: ActionTypes.HideNotification
  };
}

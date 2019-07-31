import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducers } from './reducers';
import { defaultNotificationState } from './reducers/notification-reducer';

export const store = createStore(
  reducers,
  {
    channels: [],
    channelsList: [],
    showModal: { visable: false, title: '', channel: '' },
    notification: defaultNotificationState
  },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

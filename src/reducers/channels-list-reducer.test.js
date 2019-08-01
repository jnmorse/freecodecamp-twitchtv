import { channelsListReducer } from './channels-list-reducer';
import { ActionTypes } from '../actions';

test('returns and array', () => {
  const results = channelsListReducer(undefined, { type: '@INIT' });

  expect(results).toBeInstanceOf(Array);
});

test('add channel returns channgel and adds to local storage', () => {
  const localStorageMock = (() => {
    let store = {};

    return {
      getItem: jest.fn(key => store[key]),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      clear: () => {
        store = {};
      }
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });

  const results = channelsListReducer([], {
    type: ActionTypes.AddChannel,
    payload: 'ancelak'
  });

  expect(results).toEqual(expect.arrayContaining(['ancelak']));
  expect(localStorageMock.setItem).toHaveBeenCalled();
  expect(localStorageMock.getItem('channels')).toEqual(
    JSON.stringify(['ancelak'])
  );
});

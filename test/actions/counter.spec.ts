import { action } from 'typesafe-actions';
import * as actions from '@ducks/counter/actions';
import { CounterActionTypes } from '@ducks/counter/types';

describe('counter actions', () => {
  it('should increment should create increment action', () => {
    const expectedAction = action(CounterActionTypes.INCREMENT_COUNTER);
    expect(actions.increment()).toEqual(expectedAction);
  });

  it('should decrement should create decrement action', () => {
    const expectedAction = action(CounterActionTypes.DECREMENT_COUNTER);
    expect(actions.decrement()).toEqual(expectedAction);
  });
});

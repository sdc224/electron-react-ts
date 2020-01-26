import { counterReducer } from '@ducks/counter/reducers';
import { CounterActionTypes } from '@ducks/counter/types';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counterReducer(undefined, {})).toMatchSnapshot();
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(
        counterReducer(1, { type: CounterActionTypes.INCREMENT_COUNTER })
      ).toMatchSnapshot();
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(
        counterReducer(1, { type: CounterActionTypes.DECREMENT_COUNTER })
      ).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(counterReducer(1, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});

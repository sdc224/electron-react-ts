import * as actions from '@ducks/counter/actions';

describe('actions', () => {
  it('should increment should create increment action', () => {
    expect(actions.increment()).toMatchSnapshot();
  });

  it('should decrement should create decrement action', () => {
    expect(actions.decrement()).toMatchSnapshot();
  });
});

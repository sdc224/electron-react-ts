import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement } from '@ducks/counter/actions';
import { CounterStateType } from '@ducks/counter/types';
import Counter from '@components/Counter';

function mapStateToProps(state: CounterStateType) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      increment,
      decrement
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

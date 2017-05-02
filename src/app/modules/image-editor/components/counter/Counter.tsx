import * as React from "react";
import { connect } from 'react-redux';

interface ReduxProps {
  dispatch?: Function
}

interface CounterProps extends ReduxProps {
  counter: number,
  increment: Function,
}

class Counter extends React.Component<any, void> {

  constructor(props: CounterProps) {
    super(props);
  }

  render() {

    const { counter, increment} = this.props;

    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Counter: {counter}</h2>
        <button onClick={increment}>
          Increment
        </button>
        {' '}
      </div>
    );
  }
}

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

// ------------------------------------
// Actions
// ------------------------------------
function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

const mapDispatchToProps = {
  increment : () => increment(1),
};

const mapStateToProps = (state: any) => ({
  counter : state.counter
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

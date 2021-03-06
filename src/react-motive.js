import React, { createContext } from 'react';

const reduce = (action) => ({ state, dispatch }) => {
  if (!action) return state;

  return Object.assign({}, state, action(state, dispatch));
};

const createMotive = (defaultState = {}) => {
  const { Provider, Consumer } = createContext({ state: defaultState });

  class MotiveProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        state: defaultState,
        dispatch: this.dispatch,
      };
    }

    dispatch = (action) => {
      this.setState((state) => ({
        state: reduce(action)(state),
      }));
    };

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  }

  return { Provider: MotiveProvider, Consumer };
};

export default createMotive;

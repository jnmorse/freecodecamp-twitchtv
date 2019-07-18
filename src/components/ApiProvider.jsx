/* eslint-disable react/no-unsafe, react/no-multi-comp, max-classes-per-file */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const Redux = createContext({});

export class Provider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    store: PropTypes.objectOf(PropTypes.func.isRequired).isRequired
  };

  state = {};

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.dispatch({ type: '@REDUX/@INIT' });
  }

  dispatch = action => {
    const { store } = this.props;

    Object.keys(store).forEach(async reducer =>
      this.setState(prevState => {
        return { [reducer]: store[reducer](prevState[reducer], action) };
      })
    );
  };

  render() {
    const { children } = this.props;
    return (
      <Redux.Provider value={{ ...this.state, dispatch: this.dispatch }}>
        {children}
      </Redux.Provider>
    );
  }
}

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return ConnectComponent => {
    class ConnectedComponent extends Component {
      render() {
        const ownProps = this.props;

        return (
          <Redux.Consumer>
            {({ dispatch, ...state }) => {
              const props = {
                ...(mapStateToProps ? mapStateToProps(state, ownProps) : {}),
                ...(mapDispatchToProps
                  ? mapDispatchToProps(dispatch, state)
                  : {})
              };

              return <ConnectComponent {...props} dispatch={dispatch} />;
            }}
          </Redux.Consumer>
        );
      }
    }

    return ConnectedComponent;
  };
};

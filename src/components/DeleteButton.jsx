import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DeleteButton extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    style: {},
    className: ''
  };

  state = {
    showConfirmation: false
  };

  render() {
    const { onDelete, children, ...props } = this.props;
    const { showConfirmation } = this.state;

    if (!showConfirmation) {
      return (
        <button
          type="button"
          onClick={() => this.setState({ showConfirmation: true })}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <div>
        Are you sure?
        <button type="button" onClick={onDelete}>
          Yes
        </button>
        <button
          type="button"
          onClick={() => this.setState({ showConfirmation: false })}
        >
          No
        </button>
      </div>
    );
  }
}

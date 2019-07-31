import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

export class Notification extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired
  };

  showNotification() {
    const { show, message, type } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className={styles[type]}>
        {message}
        <button
          className={styles.hideButton}
          type="button"
          onClick={this.props.hide}
          aria-label="Hide Notification"
        >
          X
        </button>
      </div>
    );
  }

  render() {
    return this.showNotification();
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.css';

export class AddChannelForm extends Component {
  static propTypes = {
    addChannel: PropTypes.func.isRequired
  };

  state = {
    name: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addChannel(this.state.name);
  };

  handleChange = event => this.setState({ name: event.target.value });

  render() {
    const { name } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={style.addForm}>
        <label className={style.inputArea}>
          <span className={style.label}>Add Streamer:</span>
          <input
            className={style.input}
            type="text"
            placeholder="name"
            onChange={this.handleChange}
            value={name}
          />
        </label>

        <button className={style.button} type="submit">
          Add
        </button>
      </form>
    );
  }
}

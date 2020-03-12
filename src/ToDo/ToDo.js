import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDo.css';

export class ToDo extends Component {
  render() {
    return (
      <div
        className="ToDo"
        onClick={this.props.click}
        data-test="TodoComponent"
      >
        <p data-test="titles">{this.props.title}</p>
        <hr />
      </div>
    );
  }
}

ToDo.propTypes = {
  title: PropTypes.string
};

export default ToDo;

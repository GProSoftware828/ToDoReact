import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Completed.css';

export class Completed extends Component {
  render() {
    return (
      <div
        className="Completed"
        onClick={this.props.click}
        data-test="CompletedComponent"
      >
        <p data-test="titles">{this.props.title}</p>
        <hr />
      </div>
    );
  }
}

Completed.propTypes = {
  title: PropTypes.string
};

export default Completed;

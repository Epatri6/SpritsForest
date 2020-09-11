import React from 'react';
import './ErrorMessage.css';

export default class ErrorMessage extends React.Component {
  render() {
    const {message} = this.props;
    return <div className="error-message">{`Error: ${message}`}</div>;
  }

  static defaultProps = {
    message: '',
  };
}

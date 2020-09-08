import React, { Fragment } from 'react';
import './AccountForm.css';

export default class AccountFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onUsernameChange = (username) => {
    this.setState({ username });
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  };

  render() {
    return (
      <Fragment>
        <form className="account-form" onSubmit={(e) => this.onSubmitForm(e)}>
          <h2>{this.props.title}</h2>
          <span className="input-row">
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => this.onUsernameChange(e.currentTarget.value)}
              type="text"
              name="username"
              required
            />
          </span>
          <span className="input-row">
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => this.onPasswordChange(e.currentTarget.value)}
              type="text"
              name="password"
              required
            />
          </span>
          <button className="form-button" id="submit">
            Submit
          </button>
        </form>
      </Fragment>
    );
  }

  static defaultProps = {
    title: 'Default',
    handleSubmit: () => {},
  };
}

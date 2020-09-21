import React from 'react';
import AuthApiService from '../../Services/auth-api-service';
import './AccountEditForm.css';
import ErrorMessage from '../Error_Message/ErrorMessage';
import {withRouter} from 'react-router';
import TokenService from '../../Services/token-service';

class AccountEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
      user: {},
      errorMessage: '',
    };
  }

  //Load user information
  componentDidMount = () => {
    AuthApiService.getUser()
      .then((res) => {
        this.setState({ user: res });
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  onUsernameChange = (username) => {
    this.setState({ username });
  };

  onPasswordChange = (pass) => {
    this.setState({ pass });
  };

  onSubmitForm = (event) => {
    const {username, pass} = this.state;
    event.preventDefault();
    if(!username && !pass) {
      this.setState({
        errorMessage: 'Please fill out at least one field'
      });
      return;
    }
    AuthApiService.patchUser(this.state)
      .then((res) => {
        TokenService.clearAuthToken();
        TokenService.saveAuthToken(res.authToken);
        this.props.history.push('/');
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  deleteUser = (e) => {
    e.preventDefault();
    AuthApiService.deleteUser()
    .then(() => {
      TokenService.clearAuthToken();
      this.props.history.push('/')
    })
    .catch((res) => {
      this.setState({
        errorMessage: res.message ? res.message : res.error ? res.error : res,
      });
    })
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="account-edit-screen">
        <h1>Sprit's Forest</h1>
        <form className="account-form" autoComplete="off" onSubmit={(e) => this.onSubmitForm(e)}>
          <h2>Update Account Information</h2>
          <span className="input-row">
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => this.onUsernameChange(e.currentTarget.value)}
              type="text"
              name="username"
              placeholder='optional'
            />
          </span>
          <span className="input-row">
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => this.onPasswordChange(e.currentTarget.value)}
              type="password"
              name="password"
              placeholder='optional'
            />
          </span>
          <span className="form-buttons">
            <button className="form-button" id="submit">
              Submit
            </button>
            <button className="form-button" onClick={(e) => this.cancel(e)}>Cancel</button>
          </span>
          <button
              className="form-button"
              onClick={(e) => this.deleteUser(e)}
            >
              Delete Account
            </button>
        </form>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }

  static defaultProps = {
    title: 'Default',
    handleSubmit: () => {},
  };
}

export default withRouter(AccountEditForm);
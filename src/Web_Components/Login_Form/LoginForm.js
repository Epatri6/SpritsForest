import React, { Fragment } from 'react';
import AccountForm from '../Account_Form/AccountForm';
import AuthApiService from '../../Services/auth-api-service';
import TokenService from '../../Services/token-service';
import ErrorMessage from '../Error_Message/ErrorMessage';
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  handleSubmitJwtAuth = (info) => {
    this.setState({ errorMessage: '' });
    const { username, password } = info;

    AuthApiService.postLogin({
      username,
      pass: password,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        this.props.history.push('/game');
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <Fragment>
        <AccountForm title="Login" handleSubmit={this.handleSubmitJwtAuth} />
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Fragment>
    );
  }

  static defaultProps = {
    history: {
      push: () => {},
    },
  };
}

export default withRouter(LoginForm);
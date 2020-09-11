import React, {Fragment} from 'react';
import AccountForm from '../Account_Form/AccountForm';
import AuthApiService from '../../Services/auth-api-service';
import ErrorMessage from '../Error_Message/ErrorMessage';
import TokenService from '../../Services/token-service';
import { withRouter } from "react-router-dom";

class AccountCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  handleSubmit = (info) => {
    const { username, password } = info;
    this.setState({ errorMessage: '' });
    AuthApiService.postUser({
      username: username,
      pass: password,
    })
    //login if successful
    .then(() => {
      AuthApiService.postLogin({
        username,
        pass: password,
      })
        .then((res) => {
          TokenService.saveAuthToken(res.authToken);
          this.props.history.push('/game')
        })
        .catch((res) => {
          this.setState({ errorMessage: (res.message ? res.message : res.error ? res.error : res) });
        });
    })
    .catch((res) => {
      this.setState({ errorMessage: (res.message ? res.message : res.error ? res.error : res) });
    });
  };

  render() {
    const {errorMessage} = this.state;
    return (
      <Fragment>
        <AccountForm title="Create Account" handleSubmit={this.handleSubmit} />
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Fragment>
    );
  }

  static defaultProps = {
    history: {
      push: () => {},
    },
  }
}

export default withRouter(AccountCreationForm);
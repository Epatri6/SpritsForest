import React from 'react';
import LoginScreen from './Web_Components/Login_Screen/LoginScreen';
import { Switch } from 'react-router-dom';
import PrivateRoute from './Web_Components/Utils/PrivateRoute';
import PublicOnlyRoute from './Web_Components/Utils/PublicOnlyRoute';
import GamePage from './Web_Components/Game_Page/GamePage';
import AccountEditForm from './Web_Components/Account_Edit_Form/AccountEditForm';
import LandingPage from './Web_Components/Landing_Page/LandingPage';

function App() {
  return (
    <main className="App">
      <Switch>
        <PublicOnlyRoute exact path={'/'} component={LandingPage} />
        <PublicOnlyRoute path={'/login'} component={LoginScreen} />
        <PrivateRoute path={'/game'} component={GamePage} />
        <PrivateRoute path={'/user'} component={AccountEditForm} />
      </Switch>
    </main>
  );
}

export default App;

import React, { ReactElement } from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import {
  ACCOUNT,
  LANDING,
  LOGIN,
  LOGOUT,
  SIGNUP,
} from '../../constants/route';

import LandingPage from '../Landing/landingPage';
import AccountPage from '../Account/accountPage';
import LoginPage from '../Login/loginPage';
import LogoutPage from '../Logout/logoutPage';
import SignUpPage from '../SignUp/signupPage';


const App = (): ReactElement => (
  <BrowserRouter>
      <Route exact path={LANDING} component={LandingPage} />
      <Route path={ACCOUNT} component={AccountPage} />
      <Route path={LOGIN} component={LoginPage} />
      <Route path={LOGOUT} component={LogoutPage} />
      <Route path={SIGNUP} component={SignUpPage} />
  </BrowserRouter>
);

export default App;

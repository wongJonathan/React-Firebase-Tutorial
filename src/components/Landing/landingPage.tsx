import React, { ReactElement } from 'react';
import LoginButton from '../Login/loginButton';
import SignupButton from '../SignUp/signupButton';

const LandingPage = (): ReactElement => (
  <div>
    Welcome to our new Firebase App!
    <br />
    <LoginButton />
    <SignupButton />
  </div>
);

export default LandingPage;

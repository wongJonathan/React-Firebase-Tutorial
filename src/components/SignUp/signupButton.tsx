import React, { ReactElement } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { SIGNUP } from '../../constants/route';

interface SignupButtonProps {
  history: History;
}

const SignupButton = ({ history }: SignupButtonProps): ReactElement => {
  const onClick = (): void => {
    history.push(SIGNUP);
  };

  return (
    <button onClick={onClick}>
      Sign Up
    </button>
  )
};

export default withRouter(SignupButton);

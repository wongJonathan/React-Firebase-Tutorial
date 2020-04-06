import React, { ReactElement } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { LOGIN } from '../../constants/route';

interface LoginButtonProps {
  history: History;
}

const LoginButton = ({ history }: LoginButtonProps): ReactElement => {
  const onClick = (): void => {
    history.push(LOGIN);
  };

  return (
    <button onClick={onClick}>
      Login
    </button>
  )
};

export default withRouter(LoginButton);

import React, { ReactElement, useContext } from 'react';
import { History } from 'history';
import { withRouter } from 'react-router-dom';

import FirebaseContext from '../Firebase/context';
import Firebase from '../Firebase/firebase';
import { LANDING } from '../../constants/route';

interface LogOutButtonProps {
  history: History;
}


const LogOutButton = ({ history }: LogOutButtonProps): ReactElement => {
  const firebase = useContext<Firebase>(FirebaseContext);

  const onClick = () => {
    firebase
      .doSignOut()
      .then(() => {
        history.push(LANDING);
      });
  };

  return(
    <button type="button" onClick={onClick}>
      Logout
    </button>
  );
};

export default withRouter(LogOutButton);

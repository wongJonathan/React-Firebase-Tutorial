import React, {
  ComponentClass,
  ReactElement,
  useContext,
  useEffect,
} from 'react';
import { withRouter } from 'react-router-dom';
import { User } from 'firebase';
import { History } from 'history';

import AuthUserContext from './authContext';
import { LOGIN } from '../../constants/route';
import Firebase from '../Firebase/firebase';
import FirebaseContext from '../Firebase/context';

interface WithAuthorizationProp {
  history: History;
}

type conditionType = (condition: User | null) => boolean;


const withAuthorization = (condition: conditionType) => (
  Component: React.ComponentType,
): ComponentClass => {
  const WithAuthorization = ({ history }: WithAuthorizationProp): ReactElement => {
    const authUser = useContext<User | null>(AuthUserContext);
    const firebase = useContext<Firebase>(FirebaseContext);

    useEffect(() => (
      firebase.onAuthStateChanged(
        (receivedUser) => {
          if (!condition(receivedUser)) {
            history.push(LOGIN);
          }
        },
      )
    ), [firebase, history]);

    return (
      <div>
        {condition(authUser) ? <Component /> : null}
      </div>
    );
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;

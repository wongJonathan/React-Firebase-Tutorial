import React, {
  ComponentType,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from 'firebase';

import AuthUserContext from './authContext';
import FirebaseContext from '../Firebase/context';
import Firebase from '../Firebase/firebase';


const withAuthentication = (Component: ComponentType) => (): ReactElement => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const firebase = useContext<Firebase>(FirebaseContext);

  useEffect(() => (
    firebase.onAuthStateChanged((receivedUser) => {
      setAuthUser(receivedUser || null);
    })
  ), [firebase]);

  return (
    <AuthUserContext.Provider value={authUser}>
      <Component />
    </AuthUserContext.Provider>
  );
};

export default withAuthentication;

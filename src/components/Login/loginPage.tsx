import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from 'react';
import { FirebaseError } from 'firebase';
import { History } from 'history';
import { withRouter } from 'react-router-dom';

import FirebaseContext from '../Firebase/context';
import { ACCOUNT } from '../../constants/route';
import Firebase from '../Firebase/firebase';

interface AccountInfoProps {
  email: string;
  password1: string;
  [key: string]: string;
}

interface LoginPageProps {
  history: History;
}


const INITIAL_INFO = {
  email: '',
  password1: '',
};

const LoginPage = ({ history }: LoginPageProps): ReactElement => {
  const [accountInfo, setAccountInfo] = useState<AccountInfoProps>(INITIAL_INFO);
  const [invalid, setInvalid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<FirebaseError | null>(null);

  const firebaseContext = useContext<Firebase>(FirebaseContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    firebaseContext
      .doSignInWithEmailAndPassword(accountInfo.email, accountInfo.password1)
      .then(() => {
        setAccountInfo(INITIAL_INFO);
        history.push(ACCOUNT);
      })
      .catch((errorMsg: FirebaseError) => {
        setErrorMessage(errorMsg);
      });

    e.preventDefault()
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAccountInfo({
      ...accountInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setInvalid(!Object.values(accountInfo).every(att => att !== ''));
    setErrorMessage(null);
  }, [accountInfo]);

  return (
    <div>
      Log into your account here!
      <form id="login" onSubmit={onSubmit}>
        <input
          form="login"
          name="email"
          value={accountInfo.email}
          onChange={onChange}
          type="text"
          placeholder="Type email here"
        />
        <input
          form="login"
          name="password1"
          value={accountInfo.password1}
          onChange={onChange}
          type="password"
          placeholder="Type password here"
        />
        <button form="login" disabled={invalid} type="submit">Login</button>
      </form>
      {errorMessage && errorMessage.message}
    </div>
  );
};

export default withRouter(LoginPage);

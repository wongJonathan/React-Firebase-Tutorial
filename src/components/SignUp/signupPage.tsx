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
  password2: string;
  [key: string]: string;
}

interface SignupPageProps {
  history: History;
}


const INITIAL_INFO = {
  email: '',
  password1: '',
  password2: '',
};

const SignUpPage = ({ history }: SignupPageProps): ReactElement => {
  const [accountInfo, setAccountInfo] = useState<AccountInfoProps>(INITIAL_INFO);
  const [invalid, setInvalid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<FirebaseError | null>(null);

  const firebaseContext = useContext<Firebase>(FirebaseContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    firebaseContext
      .doCreateUserWithEmailAndPassword(accountInfo.email, accountInfo.password1)
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
    if (accountInfo.password1 !== accountInfo.password2) {
      setErrorMessage({
        code: '',
        message: 'Passwords do not match',
        name: 'FirebaseError',
      });
      setInvalid(true);
    } else {
      setInvalid(!Object.values(accountInfo).every(att => att !== ''));
      setErrorMessage(null);
    }
  }, [accountInfo]);

  return (
    <div>
      Create your account here!
      <form id="signup" onSubmit={onSubmit}>
        <input
          form="signup"
          name="email"
          value={accountInfo.email}
          onChange={onChange}
          type="text"
          placeholder="Type email here"
        />
        <input
          form="signup"
          name="password1"
          value={accountInfo.password1}
          onChange={onChange}
          type="password"
          placeholder="Type password here"
        />
        <input
          form="signup"
          name="password2"
          value={accountInfo.password2}
          onChange={onChange}
          type="password"
          placeholder="Confirm password"
        />
        <button form="signup" disabled={invalid} type="submit">Create</button>
      </form>
      {errorMessage && errorMessage.message}
    </div>
  );
};

export default withRouter(SignUpPage);

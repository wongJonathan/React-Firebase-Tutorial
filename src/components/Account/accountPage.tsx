import React, { ReactElement, useContext } from 'react';
import AuthUserContext from '../Session/authContext';
import { User } from 'firebase';
import withAuthorization from '../Session/withAuthorization';
import LogOutButton from '../Logout/logoutButton';

const AccountPage = (): ReactElement => {
  const authUser = useContext(AuthUserContext);

  return (
    <div>
      Welcome to your account {authUser?.email}!
      <LogOutButton />
    </div>
  )
};

const condition = (authUser: User | null): boolean => !!authUser;

export default withAuthorization(condition)(AccountPage);

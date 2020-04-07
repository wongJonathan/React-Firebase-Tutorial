import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App/app';
import Firebase from './components/Firebase/firebase';
import FirebaseContext from './components/Firebase/context';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
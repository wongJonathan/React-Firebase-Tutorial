import firebase, { User } from 'firebase/app';
import 'firebase/auth';

const CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};


class Firebase {
  app: firebase.app.App;

  auth: firebase.auth.Auth;

  constructor() {
    this.app = firebase.initializeApp(CONFIG);
    this.auth = this.app.auth();
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (
    email: string, password: string,
  ): Promise<firebase.auth.UserCredential> => this
    .auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (
    email: string, password: string,
  ): Promise<firebase.auth.UserCredential> => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (): Promise<void> => this.auth.signOut();

  onAuthStateChanged = (
    callback: (user: User | null) => void,
  ): firebase.Unsubscribe => this.auth.onAuthStateChanged(callback);
}

export default Firebase;
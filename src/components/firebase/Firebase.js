import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider,
  sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager} from 'firebase/firestore';

export const config = {
  apiKey: "AIzaSyCaIL5pZBlsrynDX6CJzi21uVKvC-A-6gw",
  authDomain: "yaffle-d76fe.firebaseapp.com",
  databaseURL: "https://yaffle-d76fe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "yaffle-d76fe",
  storageBucket: "yaffle-d76fe.appspot.com",
  messagingSenderId: "1040602701618",
  appId: "1:1040602701618:web:d313a148f534e4c3d3412b",
  measurementId: "G-L48BQHY8B6"
};


class Firebase {
  constructor() {

    this.app = initializeApp(config);

    // this.db = getFirestore(this.app);

    initializeFirestore(this.app, 
      {localCache: 
        persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})
      });


    /* Helper */

    // this.serverValue = app.database.ServerValue;
    // this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = getAuth(this.app);
    // this.db = app.database();

    this.storage = getStorage(this.app);

    const getAutho = () => {
      return this.auth;
    }

    /* Social Sign In Method Provider */

    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    this.twitterProvider = new TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
}

export default Firebase;
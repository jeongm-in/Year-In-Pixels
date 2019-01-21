import React from 'react';
import Year from './Components/Year';
import moment from 'moment';
import './App.css';
import firebase, { functions } from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';


const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }

}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false, // Local signed-in state.
      userid: '',
    };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        this.setState({ isSignedIn: !!user, userid: user.uid });
      }
      // functions.database.ref('')
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleSignOut = () => {
    this.setState({ issignedIn: false, userid: '' });
    firebase.auth().signOut();
  }


  render() {
    let currentYear = moment().format('YYYY');
    let today = moment().format("MM[_]DD");
    let logInComponent = this.state.isSignedIn ? (
      <div className="d-flex flex-column justify-content-between align-items-center">
      <div>Welcome {firebase.auth().currentUser.displayName}</div>
      <button className="btn btn-sm btn-warning" onClick={this.handleSignOut}>Sign Out</button>
      </div>) : 
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
  
  


    return (
      <div className="front-bg d-flex flex-row justify-content-around align-items-center">
        <div className="front-box-parent d-flex flex-row justify-content-around align-items-center">
          <div className="d-flex flex-column justify-content-around align-items-center">
          <div className="front-parent d-flex flex-column justify-content-between align-items-center">
        <div className="front-title-box">
          <div className="front-title-text">
            Year in Pixels
                </div>
        </div>
        <div className="front-other-box d-flex flex-column justify-content-around align-items-ceneter">
          {logInComponent}
          <div className='front-other-footer d-flex flex-row justify-content-center align-items-center'>
            YearInPixels by Camille&nbsp;
                    <a href="https://www.instagram.com/passioncarnets/">(@passioncarnets)</a>
          </div>
        </div>
      </div>
          </div>
          <Year year={currentYear} today={today} />

        </div>
      </div>
    );
  }
}

export default App;

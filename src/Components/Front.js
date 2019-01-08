import React from 'react';
import firebase from 'firebase';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {Route, Switch, Redirect} from 'react-router-dom';
import About from './About';


const uiConfig = {
    signInFlow:'popup',
    signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      }

}

class Front extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
        isSignedIn: false // Local signed-in state.
      };
    }    

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
      }
      
      componentWillUnmount() {
        this.unregisterAuthObserver();
      }
    


    render() {
        let logInComponent = this.state.isSignedIn?(<div><div>Welcome {firebase.auth().currentUser.displayName}</div>        <button className ="btn btn-small btn-primary" onClick={()=>firebase.auth().signOut()}>Sign Out</button></div>):<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth = {firebase.auth()}/>;

            return(
            <div className="front-parent d-flex flex-column justify-content-between align-items-center">
                <div className = "front-title-box">
                <div className = "front-title-text">
                    Year in Pixels
                </div>
                </div>
                <div className = "front-other-box d-flex flex-column justify-content-between align-items-ceneter">
                {logInComponent}
                </div>
                <div className = 'front-other-footer d-flex flex-row justify-content-center align-items-center'>
                    YearInPixels by Camille&nbsp;
                    <a href="https://www.instagram.com/passioncarnets/">(@passioncarnets)</a>               
                </div>                            
            </div>
            );
        }


}

export default Front;

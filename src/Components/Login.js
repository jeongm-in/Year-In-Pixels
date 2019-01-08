import React from 'react';
import firebase from 'firebase'
import {StyledFirebaseAuth} from 'react-firebaseui'


const uiConfig = {
    signInFlow:'popup',
    signInSuccessUrl:'/signedin',
    signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
}

class Login extends React.Component {
    render() {
        return (
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth = {firebase.auth()}/>
            
        );
    }
}

export default Login;

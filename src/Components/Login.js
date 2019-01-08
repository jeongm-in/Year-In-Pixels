import React from 'react';
import firebase from 'firebase'
import {StyledFirebaseAuth} from 'react-firebaseui'


const uiConfig = {
    signInFlow:'redirect',
    signInSuccessUrl:'/signedin',
    signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
}

class Login extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth = {firebase.auth()}/>
            
        );
    }
}

export default Login;

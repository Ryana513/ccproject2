import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import GoogleButton from 'react-google-button';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    pathToJS
} from 'react-redux-firebase';
import { UserIsNotAuthenticated } from '../../../utils/router';
import { LIST_PATH, LOGIN_PATH } from '../../../constants';
import SignupForm from '../components/SignupForm';
import classes from './SignupContainer.scss';
@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(({ firebase }) => ({
    authError: pathToJS(firebase, 'authError')
}))



/*

// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: 'localhost:3000/projects',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'localhost:3000/tos'
};

// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

*/






export default class Signup extends Component {
    static propTypes = {
        firebase: PropTypes.object,
        authError: PropTypes.object
    };
    state = {
        snackCanOpen: false
    };
    handleSignup = (creds) => {
        this.setState({
            snackCanOpen: true
        });
        const { createUser, login } = this.props.firebase;
        createUser(creds, { email: creds.email, username: creds.username })
            .then(() => {
                login(creds)
            })
    };
    providerLogin = (provider) => {
        this.setState({
            snackCanOpen: true
        });
        this.props.firebase
            .login({ provider, type: 'popup' })
            .then(account =>
                this.context.router.push(LIST_PATH)
            )
    };
    render () {
        const { snackCanOpen } = this.state;
        const { authError } = this.props;
        return (
            <div className={classes.container}>
                <Paper className={classes.panel}>
                    <SignupForm onSubmit={this.handleSignup} />
                </Paper>
                <div className={classes.or}>
                    or
                </div>
                <div className={classes.providers}>
                    <span>
                    <GoogleButton onClick={() => this.providerLogin('google')} />
                    <button className="facebook" onClick={() => this.providerLogin('facebook')}>Log In With Facebook</button>
                    <button className="github" onClick={() => this.providerLogin('github')}>Log In With GitHub</button>
                    </span>
                </div>
                <div className={classes.login}>
          <span className={classes.loginLabel}>
            Already have an account?
          </span>
                    <Link className={classes.loginLink} to={LOGIN_PATH}>
                        Login
                    </Link>
                </div>
                {
                    isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
                    <Snackbar
                        open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
                        message={authError ? authError.message : 'Signup error'}
                        action='close'
                        autoHideDuration={3000}
                        onRequestClose={() => this.setState({ snackCanOpen: false })}
                    />
                }
            </div>
        )
    }
}

import React, {Component} from 'react';
import {withApollo} from '@grandeurcloud/apollo-react';
import {Redirect} from 'react-router-dom';

// CSS file
import '@ionic/react/css/core.css';

// Import Components
import {
    IonApp, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonLoading
} from '@ionic/react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fallback: true,
            redirect: false,
            redirectPage: ""
        }
    }

    async componentDidMount() {
        // Check with server that we are logged in or not
        // Get reference to auth from project
        var auth = this.props.apolloProject.auth();

        // Then in try catch
        try {
            // Login user
            var res = await auth.isAuthenticated();

            // Handle res codes
            switch(res.code) {
                case "AUTH-AUTHORIZED":
                    // Redirect to home page
                    if (this.state.onAuthenticated !== undefined) {
                        this.state.onAuthenticated();
                    }
                    break;

                default:
                    // Redirect to login page
                    if (this.state.onError !== undefined) {
                        this.state.onError();
                    }
            }
        } catch (error) {
            // Network Error
            console.log("Network Error");
        }
    }

    // Get Props
    static getDerivedStateFromProps(props,state) {
        return {
            fallback: props.fallback,
            redirect: props.redirect,
            redirectPage: props.redirectPage,
            onError: props.onError,
            onAuthenticated: props.onAuthenticated
        }   
    }

    render() {
        if (this.state.redirect) {
            // Redirect when required
            return <Redirect to={`/${this.state.redirectPage}`} />
        }

        if (this.state.fallback) {
            // Render fallabck
            return (
                <IonApp>

                    {/* Main app */}
                    <IonHeader>
                        {/* Header */}
                        <IonToolbar color="primary">
                            {/* Title */}
                            <IonTitle>First Grandeur App</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    {/* Content */}
                    <IonContent>
                        {/* Loader */}
                        <IonLoading
                            isOpen={this.state.fallback}
                            message={'Please wait...'}
                        />
                    </IonContent>
                </IonApp>
            )
        }
        else {
            // Otherwise render my childs
            return this.props.children;
        }
    }
}

export default withApollo(App);
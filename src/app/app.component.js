import React, {Component} from 'react';
import {withApollo} from '@grandeurcloud/apollo-react';
import Page from '../components/page/page.component';

// CSS file
import '@ionic/react/css/core.css';

// Import Components
import {
    IonApp, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonToast,
    IonButtons,
    IonButton,
    IonIcon
} from '@ionic/react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showToast: false,
            toastMessage: "Hello World",
            fallback: true,
            redirect: false,
            redirectPage: "login"
        }
    }

    onAuthenticated = () => {
        this.setState({
            fallback: false
        })
    }

    onError = () => {
        this.setState({
            redirect: true
        })
    }

    logout = async () => {
        // Get reference to auth from project
        var auth = this.props.apolloProject.auth();

        // Then in try catch
        try {
            // Login user
            var res = await auth.logout();

            // Handle res codes
            switch(res.code) {
                case "AUTH-ACCOUNT-LOGGEDOUT":
                case "AUTH-UNAUTHORIZED":
                    // Destroy session
                    sessionStorage.clear();
                    
                    // Redirect to home page
                    this.setState({
                        redirect: true
                    })
                    break;
            }
        } catch (error) {
            // Network Error
            console.log("Network Error");
        }
    }

    render() {
        return (
            <Page fallback={this.state.fallback} redirect={this.state.redirect} redirectPage={this.state.redirectPage} onAuthenticated={this.onAuthenticated} onError={this.onError}>
                <IonApp>
                    {/* Main app */}
                    <IonHeader>
                        {/* Header */}
                        <IonToolbar color="primary">
                            {/* Title */}
                            <IonTitle>First Grandeur App</IonTitle>

                            <IonButtons slot="end">
                                <IonButton onClick={this.logout}>
                                    <IonIcon slot="icon-only" ios="close" md="close"></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>

                    {/* Content */}
                    <IonContent>

                        {/* Toast */}
                        <IonToast
                            isOpen={this.state.showToast}
                            onDidDismiss={() => this.setState({showToast: false})}
                            message={this.state.toastMessage}
                            duration={2000}
                        />
                    </IonContent>
                </IonApp>
            </Page>
        )
    }
}

export default withApollo(App);
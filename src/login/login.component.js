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
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonItem, 
    IonLabel,
    IonInput,
    IonButton,
    IonToast
} from '@ionic/react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showToast: false,
            toastMessage: "Hello World",
            fallback: true,
            redirect: false,
            redirectPage: ""
        }
    }

    loginUser = async () => {
        // Get reference to auth from project
        var auth = this.props.apolloProject.auth();
        
        // Then in try catch
        try {
            // Login user
            var res = await auth.login(this.state.email, this.state.password);

            switch(res.code) {
                case "AUTH-ACCOUNT-LOGGEDIN": 
                case "AUTH-ACCOUNT-ALREADY-LOGGEDIN":
                    // Redirect
                    this.setState({
                        redirect: true
                    });

                    break;

                default: 
                    this.setState({
                        showToast: true,
                        toastMessage: res.message
                    })
            }
        } catch (error) {
            // Network Error
            this.setState({
                showToast: true,
                toastMessage: "Network Error"
            })
        }
    }

    // Inputs Changed
    onChange = (e) => {
        // Change the state of the
        const state = {};
        state[e.target.name] = e.target.value;

        // Commit the Change
        this.setState(state);
    }

    onAuthenticated = () => {
        this.setState({
            redirect: true
        })
    }

    onError = () => {
        this.setState({
            fallback: false
        })
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
                        </IonToolbar>
                    </IonHeader>

                    {/* Content */}
                    <IonContent>
                        {/* Card */}
                        <IonCard>
                            {/* Header */}
                            <IonCardHeader>
                                {/* Title */}
                                <IonCardTitle>Login</IonCardTitle>
                                
                                {/* Subtitle */}
                                <IonCardSubtitle>Please login with your account details</IonCardSubtitle>
                            </IonCardHeader>

                            {/* Content of card */}
                            <IonCardContent>
                                {/* Email  */}
                                <IonItem>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <IonInput type="email" required={true} name="email" id="email" value={this.state.email} onIonChange={this.onChange}/>
                                </IonItem>

                                {/* Password  */}
                                <IonItem>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <IonInput type="password" required={true} name="password" id="password" value={this.state.password} onIonChange={this.onChange}/>
                                </IonItem>

                                {/* Button */}
                                <IonButton expand="block" onClick={this.loginUser}>Submit</IonButton>
                            </IonCardContent>
                        </IonCard>

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

export default withApollo(Login);
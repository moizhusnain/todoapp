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
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
} from '@ionic/react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: "",
            showToast: false,
            toastMessage: "Hello World",
            fallback: true,
            redirect: false,
            redirectPage: "login",
            todos: []
        }
    }

    onAuthenticated = () => {
        this.setState({
            fallback: false
        });
    }

    onConnected = () => {
        this.renderList();
    }

    onError = () => {
        this.setState({
            redirect: true
        })
    }

    // Inputs Changed
    onChange = (e) => {
        // Change the state of the
        const state = {};
        state[e.target.name] = e.target.value;

        // Commit the Change
        this.setState(state);
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
            this.setState({
                showToast: true,
                toastMessage: "Network Error"
            })
        }
    }

    addTask = async () => {
        // Validate data
        if (!this.state.task) {
            this.setState({
                showToast: true,
                toastMessage: "Task text is required"
            })

            return;
        }

        // Obtain reference to datastore from SDK
        var datastore = this.props.apolloProject.datastore();

        // Then in try catch
        try {
            // Add the task to the datastore
            var documents = [{
                task: this.state.task
            }];

            // Insert
            var res = await datastore.collection("tasks").insert(documents);

            // Show toast
            this.setState({
                task: "",
                showToast: true,
                toastMessage: res.message
            });

            // List again
            this.renderList();
        }
        catch(err) {
            this.setState({
                showToast: true,
                toastMessage: "Network Error"
            })
        }
    }

    deleteTask = async (documentID) => {
        // Obtain reference to datastore from SDK
        var datastore = this.props.apolloProject.datastore();

        // Then in try catch
        try {
            // Insert
            var res = await datastore.collection("tasks").delete({documentID: documentID});

            // Show toast
            this.setState({
                showToast: true,
                toastMessage: res.message
            });

            // List again
            this.renderList();
        }
        catch(err) {
            this.setState({
                showToast: true,
                toastMessage: "Network Error"
            })
        }
    }

    renderList = async () => {
        // Call the server
        // Obtain reference to datastore from SDK
        var datastore = this.props.apolloProject.datastore();

        // Then in try catch
        try {
            // Get list
            var res = await datastore.collection("tasks").search();

            // Render
            this.setState({
                todos: res.documents
            })
        }
        catch(err) {
            this.setState({
                showToast: true,
                toastMessage: "Network Error"
            });
        }
    }

    render() {
        return (
            <Page fallback={this.state.fallback} redirect={this.state.redirect} redirectPage={this.state.redirectPage} onAuthenticated={this.onAuthenticated} onConnected={this.onConnected} onError={this.onError}>
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
                        {/* Card */}
                        <IonCard>
                            {/* Header */}
                            <IonCardHeader>
                                {/* Title */}
                                <IonCardTitle>Add Todo</IonCardTitle>
                                
                                {/* Subtitle */}
                                <IonCardSubtitle>Please enter the task in the field below</IonCardSubtitle>
                            </IonCardHeader>

                            {/* Content of card */}
                            <IonCardContent>
                                {/* Task  */}
                                <IonItem>
                                    <IonLabel position="floating">Task</IonLabel>
                                    <IonInput type="text" required={true} name="task" id="task" value={this.state.task} onIonChange={this.onChange}/>
                                </IonItem>

                                {/* Button */}
                                <IonButton expand="block" onClick={this.addTask}>Add Task</IonButton>
                            </IonCardContent>
                        </IonCard>

                        <IonCard>
                            {/* Header */}
                            <IonCardHeader>
                                {/* Title */}
                                <IonCardTitle>Todos</IonCardTitle>
                                
                                {/* Subtitle */}
                                <IonCardSubtitle>List of your all cool tasks</IonCardSubtitle>
                            </IonCardHeader>

                            {/* Content of card */}
                            <IonCardContent>
                                <IonList>
                                    {this.state.todos.map(todo => 
                                        <IonItemSliding key={todo.documentID}>
                                            {/* Main Item */}
                                            <IonItem>
                                                <IonLabel>{todo.task}</IonLabel>
                                            </IonItem>

                                            {/* Options */}
                                            <IonItemOptions side="end">
                                                {/* Option */}
                                                <IonItemOption onClick={() => this.deleteTask(todo.documentID)} color="danger">Delete</IonItemOption>
                                            </IonItemOptions>
                                        </IonItemSliding>)
                                    }
                                </IonList>
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

export default withApollo(App);
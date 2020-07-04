import React from 'react';
import ReactDOM from 'react-dom';

// Import Apollo
import {Apollo} from '@grandeurcloud/apollo-react';

// Import Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Component
import App from './app/app.component';
import Login from './login/login.component';

// Access Credential
var accessCredential = {
  accessKey: "accesskc86n5vz00w601vzfxft9n8o",
  accessToken: "eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNkltRmpZMlZ6YzJ0ak9EWnVOWFo2TURCM05qQXhkbnBtZUdaME9XNDRieUlzSW5SNWNHVWlPaUpoWTJObGMzTWlMQ0pwWVhRaU9qRTFPVE00T1RrMU5UZDkucTI5UWYxRUFNNnpOTnk2OVJMd3B6Z3lkQm9NXzBxeXlXcmctQ3NHX2dBYyJ9"
}

// App
const content = (
  <Apollo apiKey="grandeurkc86mm5c00w201vz32649hh0" accessCredential={accessCredential}>
    {/* Router */}
    <Router>
        <Switch>
          {/* Default */}
          <Route exact path="/" component={App} />

          {/* Login */}
          <Route path="/login" component={Login} />
        </Switch>
    </Router>
  </Apollo>
)

ReactDOM.render(
  content,
  document.getElementById('root')
);
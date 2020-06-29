import React from 'react';
import ReactDOM from 'react-dom';

// Import Apollo
import {Apollo} from '@grandeurcloud/apollo-react';

// Component
import App from './app/app.component';

// Access Credential
var accessCredential = {
  accessKey: "accesskc1424wk011y01vzeoxcb2vb",
  accessToken: "eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNkltRmpZMlZ6YzJ0ak1UUXlOSGRyTURFeGVUQXhkbnBsYjNoallqSjJZaUlzSW5SNWNHVWlPaUpoWTJObGMzTWlMQ0pwWVhRaU9qRTFPVE0wTnpFNU5UUjkuVEtpTGFyb0ZHZUsyaGlLVkxReU15RGhtcWpibFoxX0J3N3BIXzFoTm81WSJ9"
}

// App
const content = (
  <Apollo apiKey="grandeurkc11puye011m01vzb9zg42iv" accessCredential={accessCredential}>
    <App />
  </Apollo>
)

ReactDOM.render(
  content,
  document.getElementById('root')
);
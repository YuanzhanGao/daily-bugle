import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {Auth0Provider} from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain = 'dev-bnrmf0twdaw00ceq.us.auth0.com'
    clientId='He29405zUkBCKdcD2BwFaOeIqxmhkknU'
    redirectUri={window.location.origin}
    >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

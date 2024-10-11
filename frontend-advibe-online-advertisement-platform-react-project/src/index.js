import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {UserProvider} from "./context/UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="1032270684555-9dqsafevqck5tjebaka5uph7fk182e4u.apps.googleusercontent.com">
            <UserProvider>
            <App />
            </UserProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

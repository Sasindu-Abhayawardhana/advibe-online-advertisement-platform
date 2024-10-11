import React, {useEffect, useState} from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {useUser} from "../../context/UserProvider";
import "../../css-style/UserLogin.css"

/*
* This handle the user google authentication login
* handle the logout
*
* User must log through users google account
* */
const UserLogin = () => {

    const {userLoginDetails, setUserLoginDetails, isLoggedOut, setIsLoggedOut} = useUser();

    const [userData, setUserData] = useState('');
    const [loginData, setLoginData] = useState(localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null);

    // use Google authentication
    const handleGoogleLogin = useGoogleLogin({

        onSuccess: (credentialResponse) => {

            setIsLoggedOut(false);

            // handleLogout();
            console.log("Here");
            try {
                console.log("Here");

                const accessToken = credentialResponse.access_token;  // The access token you got

                fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);  // This will contain user information like email, name, etc.
                        const {email} = data;
                        console.log(email);
                        setUserLoginDetails(data);
                        console.log(userLoginDetails);

                    })
                    .catch(error => {
                        console.error('Error fetching user info:', error);
                    });
            } catch (error) {
                console.error("Error during Google login:", error);
            }
        }, // flow: 'auth-code',
        flow: 'implicit', prompt: 'select_account'
    });


    const handleLogout = () => {

        console.log("logout");
        localStorage.removeItem('loginData');
        sessionStorage.clear();
        setLoginData(null);
        setUserData(null);
        setUserLoginDetails(null);
    };

    useEffect(() => {
        if (isLoggedOut) {
            // Trigger the logout action when the account is deleted
            handleLogout();
        }
    }, [isLoggedOut, handleLogout]);

    return (
        <div className="user-login">
            <div className="login-container">
                <button className="login-btn" onClick={userLoginDetails ? null : () => handleGoogleLogin()}>
                    {userLoginDetails ? `${userLoginDetails.given_name}` : 'Sign in with Google'}
                </button>

                {userLoginDetails && (<button className="logout-btn" onClick={handleLogout}>Logout</button>)}
            </div>
        </div>);
}

export default UserLogin;
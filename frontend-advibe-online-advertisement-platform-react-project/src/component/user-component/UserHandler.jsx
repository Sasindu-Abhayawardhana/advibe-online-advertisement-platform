import React, {useEffect, useState} from 'react';
import User from "./User";
import {useUser} from "../../context/UserProvider";
import NewUserForm from "./NewUserForm";

/*
* Handle the user registration
* load the user details from the server
* */
const UserHandler = () => {

    const {userLoginDetails, dbUserDetails, setDbUserDetails} = useUser();
    const [userAvaible, setUserAvaible] = useState(false);
    console.log("userLoginDetails", userLoginDetails);

    const [errorMessage, setErrorMessage] = useState('');
    const [userCreated, setUserCreated] = useState(false);

    // send post request to server to save the user after submit the user registration form
    const handleSubmit = async (event) => {

        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'), name: formData.get('name'), contact: formData.get('contact'),
        };

        try {
            const response = await fetch('http://localhost:5050/users/', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get the response body as JSON
                console.error('Failed to update the User.', errorData);
                const errorProperty =  errorData.errors[0]?.property;

                alert(`Failed to update the User due to incorrect : ${errorProperty}`);
                throw new Error(errorData.message);
            }

            // Handle success (e.g., redirect or show success message)
            console.log("Account created successfully!");
            setUserCreated(true);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
        }
    };

    // If the user has already registered, load the user details after user authenticate
    useEffect(() => {

        if (userLoginDetails) {
            console.log('User has changed:', userLoginDetails);
            const {email} = userLoginDetails;
            const fetchUsers = async () => {
                try {
                    const response = await fetch(`http://localhost:5050/users/${email}`);

                    if (response.status === 404) {
                        // If the user is not found, display a prompt to create a new account
                        console.log("Not Found Error");
                        console.log(userAvaible);
                        setUserAvaible(false);

                    } else {
                        const userResponse = await response.json();
                        setUserAvaible(true);
                        console.log(userAvaible);
                        console.log(response.status);
                        setDbUserDetails(userResponse);
                        console.log("came here", dbUserDetails);
                        // Handle successful login
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error("Failed to log in");
                }
            }
            fetchUsers();
        } else {
            console.log('No user logged in.');
        }
    }, [userLoginDetails, userCreated]);

    return (
        <div className="NewUser">
        {userLoginDetails ? userAvaible ? <User dbUserDetails={dbUserDetails}/> :
            <NewUserForm handleSubmit={handleSubmit}/> : <p>Please Login</p>}
    </div>);
}

export default UserHandler;
import {Form, useActionData} from "react-router-dom";
import React, {useState} from "react";
import {useUser} from "../../context/UserProvider";
import '../../css-style/NewUserForm.css';

/*
* user registration form
* validate data within the form : empty
* Also at the save data validate by sending post req to server side
* */
const NewUserForm = ({handleSubmit}) => {
    const {userLoginDetails} = useUser();
    const actionData = useActionData(); // Get action data from form submission
    const [errorMessage, setErrorMessage] = useState('');

    // use React form

    return (

        <div className="new-form-container">
            <h2>Create a New Account</h2>
            {/* Add fields for new account creation */}
            <Form method="post" onSubmit={handleSubmit} className="new-account-form">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={userLoginDetails.email}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={userLoginDetails.name}
                        required
                    />
                    {actionData?.nameError && <p className="error-message">{actionData.nameError}</p>}
                </div>

                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contact"
                        placeholder="Enter your contact number"
                        required
                    />
                    {actionData?.contactError && <p className="error-message">{actionData.contactError}</p>}
                </div>

                <button type="submit" className="submit-button">Create Account</button>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Form>
        </div>
    );
};

export default NewUserForm;
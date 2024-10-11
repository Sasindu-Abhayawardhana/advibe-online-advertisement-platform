import {Form, redirect, useActionData, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useUser} from "../../context/UserProvider";
import '../../css-style/NewUserForm.css';

/*
* New Advertisement Form
* */
const NewAdForm = ({ handleClose,saveNewAd }) => {  // handleClose passed as prop
    const {dbUserDetails} = useUser();
    const actionData = useActionData(); // Get action data from form submission
    const [errorMessage, setErrorMessage] = useState('');
    const today = new Date().toISOString().split('T')[0];


    return (
        <div className="new-form-container">
            <h2>Create a New Account</h2>
            {/* Add fields for new account creation */}
            <Form method="post" onSubmit={saveNewAd} className="new-account-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="title"
                        name="title"
                        placeholder="Enter your ad title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        placeholder="Enter any description"
                        required={true}
                    />
                    {actionData?.nameError && <p className="error-message">{actionData.nameError}</p>}
                </div>

                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contact"
                        value={dbUserDetails.contact}
                        placeholder="Enter your contact number"
                        readOnly={true}
                    />
                    {actionData?.contactError && <p className="error-message">{actionData.contactError}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={dbUserDetails.email}
                        placeholder="Enter your email"
                        readOnly={true}
                    />
                    {actionData?.contactError && <p className="error-message">{actionData.contactError}</p>}
                </div>

                <div className="form-group">
                    <label>Posted Date</label>
                    <input
                        type="date"
                        name="postedDate"
                        value={today} // Pre-fill today's date
                        readOnly={true}
                    />
                </div>

                <button type="submit" className="submit-button" >Create Add</button>

                {/* Add the Close button that triggers the handleClose function */}
                <button type="button" className="submit-button" onClick={handleClose}>Close</button>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Form>
        </div>
    );
};

export default NewAdForm;
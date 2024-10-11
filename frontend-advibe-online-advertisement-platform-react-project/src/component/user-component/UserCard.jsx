import React, {useEffect, useState} from 'react';
import '../../css-style/userCard.css';
import {useUser} from "../../context/UserProvider";
import {useActionData} from "react-router-dom";

/*
* Handler the user details
* Display the user details
* Save,Update,Delete the user details
* */
const UserCard = ({dbUserDetails}) => {

    const {name, email, contact} = dbUserDetails;
    const { userLoginDetails,setUserLoginDetails,setDbUserDetails, adsList, setAdsList,setIsLoggedOut} = useUser();
    const actionData = useActionData(); // Get action data from form submission
    const [errorMessage, setErrorMessage] = useState('');
    const [userVerified, setUserVerified] = useState(true);
    const [updateMode, setUpdateMode] = useState(false); // Toggle update mode

    const [editedName, setEditedName] = useState(name); // Store edited title
    const [editedContact, setEditedContact] = useState(contact);


    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
        if (confirmDelete) {
             try {
                 const response = await fetch(`http://localhost:5050/users/${email}`, {
                     method: 'DELETE',
                 });

                 if (response.ok) {
                     console.log(`User with email: ${email} deleted successfully.`);
                     const updatedUsersList = adsList.filter((ad) => ad.email !== email);
                     setAdsList(updatedUsersList);
                     setIsLoggedOut(true);
                 } else {
                     console.error('Failed to delete the user.');
                 }
             } catch (error) {
                 console.error('Error deleting the user:', error);
             }
        }
    };

    // when user card update button click update mode is activated
    // Then save and cancel button activated
    const handleUpdate = () => {
        // Enable edit mode
        setUpdateMode(true);
    };

    const handleSave = async () => {
        console.log("send user update");
        let response;
        try {
            response = await fetch(`http://localhost:5050/users/`, {
                method: 'PATCH', // Use PUT or PATCH to update the existing ad
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: editedName,
                    contact: editedContact
                }),
            });

            if (response.ok) {
                  console.log(`User with email: ${email} updated successfully.`);
                  setUpdateMode(false); // Exit update mode
                  // Optionally update the ad in the usersList state
                  const updatedUser = {
                      name: editedName,
                      contact: editedContact,
                      email: email
                  }
                  setDbUserDetails(updatedUser);
                  console.log(updatedUser);

            } else {
                const errorData = await response.json(); // Get the response body as JSON
                console.error('Failed to update the User.', errorData);
                const errorProperty =  errorData.errors[0]?.property;

                alert(`Failed to update the User due to incorrect : ${errorProperty}`);
                setUserVerified(false);
            }
        } catch (error) {
            console.error('Error updating the user:', response);
            console.error('Error updating the user:', error);
        }
    };

    useEffect(() => {

        console.log(userLoginDetails);

        const fetchAds = async () => {
            try {
                const response = await fetch("http://localhost:5050/ads/");
                const fetchDbAdsList = await response.json();
                setAdsList(fetchDbAdsList);
                console.log(fetchDbAdsList);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAds();
    }, []);

    return (
        <div>
            <div className="user-details">
                <h2>User Details</h2>

                {updateMode ? (
                        <>
                            <div className="detail">
                                <span className="label">Name   :</span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    required
                                />
                                {actionData?.nameError && <p className="error-message">{actionData.nameError}</p>}
                            </div>
                            <div className="detail">
                                <span className="label">contact :</span>
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Enter your contact number"
                                    value={editedContact}
                                    onChange={(e) => setEditedContact(e.target.value)}
                                    required
                                />
                                {actionData?.contactError && <p className="error-message">{actionData.contactError}</p>}
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="detail">
                                <span className="label">Name   :</span>
                                <span className="value">{dbUserDetails.name}</span>

                            </div>

                            <div className="detail">
                                <span className="label">contact :</span>
                                <span className="value">{dbUserDetails.contact}</span>
                            </div>
                        </>
                    )
                }

                <div className="detail">
                    <span className="label">Email   :</span>
                    <span className="value">{email}</span>
                </div>

                <div className="advertisement-actions">
                    {updateMode ? (
                        <>
                            <button type="submit" onClick={handleSave} className="save-button" disabled={!editedName.trim() || !editedContact.trim()}>Save</button>
                            <button onClick={() => setUpdateMode(false)} className="cancel-button" disabled={!editedName.trim() || !editedContact.trim()}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleUpdate} className="update-button">Update</button>
                            <button onClick={handleDelete} className="delete-button">Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserCard;

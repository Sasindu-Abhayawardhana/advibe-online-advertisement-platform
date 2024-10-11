import React, {useEffect, useState} from 'react';
import {useUser} from "../../context/UserProvider";
import '../../css-style/AdvertisementCard.css';

/*
* Display the advertisement details
* according the mode can handle ad update, save and delete
* */

const AdvertisementCard = ({id, title, description, postedDate, email, name, contact, imageUrl}) => {
    const {userLoginDetails, adsList, dbUserDetails, setAdsList} = useUser(); // Get the current user from context

    const [updateMode, setUpdateMode] = useState(false); // Toggle update mode
    const [editedTitle, setEditedTitle] = useState(title); // Store edited title
    const [editedDescription, setEditedDescription] = useState(description); // Store edited description

    console.log("Ad Card",id,title,description,email,contact);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5050/ads/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log(`Ad with ID: ${id} deleted successfully.`);
                    const updatedUsersList = adsList.filter((ad) => ad.id !== id);
                    setAdsList(updatedUsersList);
                } else {
                    console.error('Failed to delete the ad.');
                }
            } catch (error) {
                console.error('Error deleting the ad:', error);
            }
        }
    };

    const handleUpdate = () => {
        // Enable edit mode
        setUpdateMode(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5050/ads/`, {
                method: 'PATCH', // Use PUT or PATCH to update the existing ad
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    id: id, title: editedTitle, description: editedDescription
                }),
            });

            if (response.ok) {
                console.log(`Ad with ID: ${id} updated successfully.`);
                setUpdateMode(false); // Exit update mode
                // Optionally update the ad in the usersList state
                const updatedAd = {
                    id: id,
                    title: editedTitle,
                    description: editedDescription,
                    posted_date: postedDate,
                    user_email: email
                };
                console.log("Object",updatedAd);

                const newAdArray = adsList.map(ad =>ad.id === id ? { ...ad, title: editedTitle, description: editedDescription } : ad)
                setAdsList(newAdArray);
                console.log("Update SAve",adsList);
            } else {
                console.error('Failed to update the ad.');
            }
        } catch (error) {
            console.error('Error updating the ad:', error);
        }
    };
    console.log("Ad Card 2",id,title,description,email,contact);
    console.log("Ad Card Ads List",adsList);

    // when update mode display the update and delete button and enable save and cancel button
    return (
        <div className="advertisement-card">
            <div className="advertisement-image-container">
                <img src={imageUrl} alt="No Image" className="advertisement-image"/>
            </div>
            <div className="advertisement-details">
                {
                    updateMode ?
                        (<>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="advertisement-title-input"
                        />
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="advertisement-description-input"
                        />
                    </>) : (<>
                        <h2 className="advertisement-title">{title}</h2>
                        <p className="advertisement-description">{description}</p>
                    </>)
                }

                <span className="advertisement-email">Posted By : {name}</span>
                <span className="advertisement-email">Contact: {contact} / {email}</span>

                <div className="advertisement-meta">
                    <span className="advertisement-date">Posted on: {new Date(postedDate).toLocaleDateString()}</span>
                    <span className="advertisement-id">Ad ID: {id}</span>
                </div>

                {userLoginDetails?.email === email && (<div className="advertisement-actions">
                        {updateMode ? (<>
                                <button onClick={handleSave} className="save-button">Save</button>
                                <button onClick={() => setUpdateMode(false)} className="cancel-button">Cancel</button>
                            </>) : (<>
                                <button onClick={handleUpdate} className="update-button">Update</button>
                                <button onClick={handleDelete} className="delete-button">Delete</button>
                            </>)}
                    </div>)}
            </div>
        </div>);
};

export default AdvertisementCard;
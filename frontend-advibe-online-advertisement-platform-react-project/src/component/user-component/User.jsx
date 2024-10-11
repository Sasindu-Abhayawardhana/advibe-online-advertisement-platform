import React, {useEffect, useState} from 'react';
import '../../css-style/userCard.css';
import AdvertisementCard from "../advertisemnet-component/AdvertisementCard";
import {useUser} from "../../context/UserProvider";
import UserCard from "./UserCard";
import NewAdForm from "../advertisemnet-component/NewAdForm";
import '../../css-style/AdvertisementCard.css';

/*
* Main user component
* show users' details and associate ads
* user can delete ads or remove or update
* */
const User = ({dbUserDetails}) => {

    const {userLoginDetails, adsList, setAdsList} = useUser();
    const [showNewAd, setShowNewAd] = useState(false);

    const handleNewAd = () => {
        setShowNewAd(true);
    };

    const handleCloseNewAd = () => {
        setShowNewAd(false);
    };

    const saveNewAd = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(event.target);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            userEmail: formData.get('email'),
            contact: formData.get('contact'),
            postedDate: formData.get('postedDate')
        };

        try {
            const res = await fetch('http://localhost:5050/ads/', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) {
                const errorResult = await res.json();
                console.log("Came Here Error");
                throw new Error(errorResult.message);

            }

            alert(`Ad created successfully! Your Ad : ${result}`);
            fetchAds();
            // Handle success (e.g., redirect or show success message)
            console.log("Ad created successfully!", result);

        } catch (error) {
            console.log(error);
        }

        // handleCloseNewAd();
    }

    const fetchAds = async () => {
        try {
            const response = await fetch("http://localhost:5050/ads/");
            const adListResult = await response.json();
            setAdsList(adListResult);
            console.log("Add List", adListResult);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAds();
    }, []);

    // When the new advertisement button click it hide the user card and display the new ad form
    return (
        <div>
            {showNewAd ? (<NewAdForm
                saveNewAd={saveNewAd}
                handleNewAd={handleNewAd}
                handleClose={handleCloseNewAd}  // Pass handleClose to manage closing
            />) : <UserCard dbUserDetails={dbUserDetails}/>}

            <div className="advertisement-actions">
                <button id="newAddButton" onClick={handleNewAd} className="newAd-button">New Advertisement</button>
            </div>

            {adsList.length === 0 ? (
                <p>Loading ads...</p>  // Display a loading message while ads are being fetched
            ) : (
                adsList.filter((ad) => ad.email === dbUserDetails.email).map((ad, index) => (
                    <AdvertisementCard
                    key={index}
                    id={ad.id}
                    title={ad.title}
                    description={ad.description}
                    postedDate={ad.posted_date}
                    name={ad.name}
                    contact={ad.contact}
                    email={ad.user_email}
                />))
            )}

        </div>);
}

export default User;
import React, {useEffect, useState} from 'react';
import AdvertisementCard from "./advertisemnet-component/AdvertisementCard";
import "../css-style/Home.css"
import {useUser} from "../context/UserProvider";
import SearchBar from "./SearchBar";

/*
* Home component
* user landed to this component and handle ads loading from server*/
const Home = () => {

    const {adsList, setAdsList} = useUser();
    const [text, setText] = useState('');

    // fetch the all ads by sending a get to server before render
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5050/ads/");
                const allAds = await response.json();
                setAdsList(allAds);
                console.log(allAds);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, []);

    let searchAds = adsList.filter((ad) => ad.title.toLowerCase().includes(text.toLowerCase()));

    const SearchChange = (event) => {
        console.log(event.target.value);
        setText(event.target.value);
    }

    console.log("userList", searchAds);

    return (
        <div className="home-container">
            <SearchBar onSearch={SearchChange} searchText={text}/>

            {adsList.length === 0 ? (
                <p>Loading ads...</p>  // Display a loading message while ads are being fetched
            ) : (

                <div className="advertisement-list">
                    {adsList.filter((ad) => ad.title.toLowerCase().includes(text.toLowerCase())).map((ad, index) => (
                        <AdvertisementCard
                            key={index}
                            id={ad.id}
                            title={ad.title}
                            description={ad.description}
                            postedDate={ad.posted_date}
                            name={ad.name}
                            contact={ad.contact}
                            email={ad.user_email}
                        />))}
                </div>
            )
            }
        </div>
    )
}
export default Home;

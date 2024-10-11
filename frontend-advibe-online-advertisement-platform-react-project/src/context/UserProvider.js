import React, {createContext, useState, useContext} from 'react';

// Create a UserContext
const UserContext = createContext();

/*
* user provider use to share data across component
* */
export const UserProvider = ({children}) => {
    const [userLoginDetails, setUserLoginDetails] = useState(null);
    const [adsList, setAdsList] = useState([]);
    const [dbUserDetails, setDbUserDetails] = useState(null);// Add usersList state
    const [isLoggedOut, setIsLoggedOut] = useState(false)

    return (
        <UserContext.Provider value={{
            userLoginDetails,
            setUserLoginDetails,
            adsList,
            setAdsList,
            dbUserDetails,
            setDbUserDetails,
            isLoggedOut,
            setIsLoggedOut
        }}>
            {children}
        </UserContext.Provider>);
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
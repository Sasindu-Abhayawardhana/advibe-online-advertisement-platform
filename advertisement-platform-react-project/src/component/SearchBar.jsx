import React from "react";
import "../css-style/Home.css"

/*
* search bar component to filter the ads with their title
* */
const SearchBar = ({onSearch, searchText}) => {

    const SearchHandler = (event) => {
        onSearch(event);
    }
    return (
        <div className="sidebar">
            <h2>Search Advertisements</h2>
            <input className="search-bar"
                   type="text"
                   placeholder="Search by title"
                   value={searchText}
                   onChange={SearchHandler}
                   className="search-input"
            />
            <button className="search-btn">Search</button>
        </div>);
}

export default SearchBar;
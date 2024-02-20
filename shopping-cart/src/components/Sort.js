import React from "react";
import './css/Sort.css';

const Sort = ({ onSelectSortOption }) => {
    const handleSortOptionClick = (sortOption) => {
        onSelectSortOption(sortOption);
    };
    return(
        <div className="sort-container">
            <span className="sort-option" onClick={() => handleSortOptionClick("Price low to high")}>Price low to high</span>
            <span className="sort-option" onClick={() => handleSortOptionClick("Price high to low")}>Price high to low</span>
            <span className="sort-option" onClick={() => handleSortOptionClick("Rating")}>Rating</span>
        </div>
    );
};
export default Sort;

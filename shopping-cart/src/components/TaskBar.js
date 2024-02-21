import React, { useState } from "react";
import './css/TaskBar.css';
import CategoriesDropdown from "./CategoriesDropdown";
import Sort from "./Sort";
import logoImage from '../assets/logo.png';
import searchIconImage from '../assets/search-icon.png';
import profileIconImage from '../assets/profile-icon.png';
import cartIconImage from '../assets/cart-icon.png';
import sortIconImage from '../assets/sort-icon.png';

const TaskBar = ({ onSelectCategory, onSelectSortOption }) => {
    const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
    const [showSortOptions, setShowSortOptions] = useState(false);

    const toggleCategoriesDropdown = () => {
        setShowCategoriesDropdown(!showCategoriesDropdown);
        setShowSortOptions(false);
    };

    const toggleSortOptions = () => {
        setShowSortOptions(!showSortOptions);
        setShowCategoriesDropdown(false); 
    };

    const handleCategoryClick = (category) => {
        onSelectCategory(category);
        setShowCategoriesDropdown(false); 
    };

    return (
        <div className="taskbar"> 
            <div className="left">
                <img src={logoImage} alt="Logo" className="logo"/>
            </div>
            <div className="center">
                <input type="text" placeholder="Search" className="searchField" />
                <img src={searchIconImage} alt="search" className="searchIcon" />
            </div>
            <div className="right">                
                <div className="categories" onClick={toggleCategoriesDropdown}>
                    <span>Categories</span>
                    {showCategoriesDropdown && <CategoriesDropdown onSelectCategory={handleCategoryClick} />}
                </div>
                <div className="sort" onClick={toggleSortOptions}>
                    <img src={sortIconImage} alt="Sort-Icon" className="sort-icon"/>
                    <span className="sortSpan">Sort by</span>
                    {showSortOptions && <Sort onSelectSortOption={onSelectSortOption} />}
                </div> 
                <div className="profile"> 
                    <img src={profileIconImage} alt="Profile-Icon" className="profile-icon"/>
                    <span>Profile</span>
                </div>
                <div className="cart">
                    <img src={cartIconImage} alt="Cart-Icon" className="cart-icon"/>
                    <span className="cartSpan">Cart</span>
                </div>               
            </div>
        </div>
    );
};




export default TaskBar;

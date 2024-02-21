import React, { useState, useEffect } from "react";
import './css/CategoriesDropdown.css';

const CategoriesDropdown = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryClick = (category) => {
        onSelectCategory(category);
    };

    return (
        <div className="categories-dropdown">
            
            {categories.map((category, index) => (
                <span key={index} className="categories-item" onClick={() => handleCategoryClick(category)}>
                    {category}
                </span>
            ))}
        </div>
    );
};

export default CategoriesDropdown;

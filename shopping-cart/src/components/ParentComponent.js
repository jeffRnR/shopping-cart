import React, { useState } from "react";
import TaskBar from "./TaskBar";
import Products from "./Products";
import './css/ParentComponent.css';

const ParentComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleSelectSortOption = (sortOption) => {
        setSelectedSortOption(sortOption);
    };

    return (
        <div className="parentComponent">
            <TaskBar onSelectCategory={handleSelectCategory} onSelectSortOption={handleSelectSortOption} />
            <Products selectedCategory={selectedCategory} selectedSortOption={selectedSortOption} />
        </div>
    );
};

export default ParentComponent;

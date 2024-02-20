// Layout.js
import React from "react";
import './css/Layout.css';
//import TaskBar from "./TaskBar";
import Products from "./Products"; // Import Products component
import TaskBar from "./TaskBar";
import ParentComponent from "./ParentComponent";

const Layout = () => {
    return (
        <div className="container">
            <ParentComponent />
        </div>
    )
}

export default Layout;

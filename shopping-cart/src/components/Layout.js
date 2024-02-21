
import React from "react";
import './css/Layout.css';
//import Products from "./Products"; 
//import TaskBar from "./TaskBar";
import ParentComponent from "./ParentComponent";

const Layout = () => {
    return (
        <div className="container">
            <ParentComponent />
        </div>
    )
}

export default Layout;

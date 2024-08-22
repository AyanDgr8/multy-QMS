// src/components/routes/Landing/Landing/Landing.js

import React, { useState } from "react";
import './Landing.css';
import MainBody from "../MainBody/MainBody";
import MainBody2 from "../MainBody2/MainBody2";
import MainFiles from "../MainFiles/MainFiles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Landing = () => {
    const [selectedFilter, setSelectedFilter] = useState("ReportData"); // Default filter is ReportData

    // This function will handle the filter change
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <div>
            <div className="everything">
                <div className="main-first">
                    <Header onFilterChange={handleFilterChange} /> {/* Pass the filter change handler */}
                </div>
                <div className="main-second">
                    <div className="side-content"> 
                        <Sidebar/>
                    </div>
                    <div className="mbody-content">
                        {selectedFilter === "ReportData" ? <MainBody /> : <MainBody2 />} {/* Conditional rendering */}
                        <MainFiles />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;


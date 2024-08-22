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
    const [searchQuery, setSearchQuery] = useState("");

    // This function will handle the filter change
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    // Define the onSearch function
    const handleSearch = (spokenWords, addWords, timeBasis) => {
        // Prepare the query parameters based on the presence of search terms
        let queryParams = [];
        
        if (spokenWords) queryParams.push(`spokenWords=${encodeURIComponent(spokenWords)}`);
        if (addWords) queryParams.push(`addWords=${encodeURIComponent(addWords)}`);
        if (timeBasis) queryParams.push(`timeBasis=${encodeURIComponent(timeBasis)}`);
    
        const query = queryParams.join('&');
        setSearchQuery(query);
        console.log('Search triggered with:', { spokenWords, addWords, timeBasis });
    };

    return (
        <div>
            <div className="everything">
                <div className="main-first">
                    <Header onFilterChange={handleFilterChange} /> {/* Pass the filter change handler */}
                </div>
                <div className="main-second">
                    <div className="side-content"> 
                        <Sidebar />
                    </div>
                    <div className="mbody-content">
                        {/* Conditionally render MainBody or MainBody2 and pass handleSearch as a prop to MainBody */}
                        {selectedFilter === "ReportData" ? (
                            <MainBody onSearch={handleSearch} /> 
                        ) : (
                            <MainBody2 />
                        )}
                        <MainFiles searchQuery={searchQuery} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;

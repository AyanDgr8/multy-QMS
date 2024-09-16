// src/components/routes/Landing/Landing.js

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
    const [wordGroups, setWordGroups] = useState({
        positive: [],
        negative: [],
        neutral: []
    });

    // Function to handle filter changes
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    // Function to handle search actions
    const handleSearch = (spokenWords, addWords, timeBasis) => {
        const query = {
            spokenWords: spokenWords || '',
            addWords: addWords || '',
            timeBasis: timeBasis || ''
        };
        setSearchQuery(query);
        console.log('Search triggered with:', query);
    };

    // Function to handle changes in selected word groups
    const handleWordGroupsChange = (newWordGroups) => {
        setWordGroups(newWordGroups); // Update the word groups state with the new data from Sidebar
    };

    return (
        <div>
            <div className="everything">
                <div className="main-first">
                    <Header onFilterChange={handleFilterChange} /> {/* Pass filter change handler to Header */}
                </div>
                <div className="main-second">
                    <div className="side-content">
                        {/* Pass the handleWordGroupsChange function to Sidebar */}
                        <Sidebar onWordGroupsChange={handleWordGroupsChange} />
                    </div>
                    <div className="mbody-content">
                        {/* Conditionally render MainBody or MainBody2 based on selectedFilter */}
                        {selectedFilter === "ReportData" ? (
                            <MainBody onSearch={handleSearch} />
                        ) : (
                            <MainBody2 />
                        )}
                        {/* Pass searchQuery and wordGroups to MainFiles */}
                        <MainFiles searchQuery={searchQuery} wordGroups={wordGroups} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;

// src/components/routes/MainFiles/MainFiles.js

import React, { useEffect, useState, useRef } from "react";
import "./MainFiles.css";

const MainFiles = ({ searchQuery }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openFileId, setOpenFileId] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams();
                if (searchQuery?.spokenWords) {
                    params.append("spokenWords", searchQuery.spokenWords);
                }
                if (searchQuery?.addWords) {
                    params.append("addWords", searchQuery.addWords);
                }
                if (searchQuery?.timeBasis) {
                    params.append("timeBasis", searchQuery.timeBasis);
                }

                const queryString = params.toString();
                console.log(`Query string: ${queryString}`);

                if (queryString) {
                    const response = await fetch(`http://localhost:8000/api/search-transcriptions/?${queryString}`);
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Network response was not ok: ${errorText}`);
                    }
                    const result = await response.json();
                    console.log("API response:", result);
                    setData(result);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error during fetch:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            setLoading(true);
            fetchData();
        }
    }, [searchQuery]);

    const toggleDetails = (fileId) => {
        if (openFileId === fileId) {
            setOpenFileId(null);
        } else {
            setOpenFileId(fileId);
            const element = document.getElementById(`file-${fileId}`);
            if (element && containerRef.current) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                containerRef.current.scrollTop = element.offsetTop - (containerRef.current.clientHeight / 2) + (element.clientHeight / 2);
            }
        }
    };

    const highlightText = (text, searchTerms) => {
        if (!searchTerms) return text;

        // Escape special characters for regex
        const escapedSearchTerms = searchTerms.split(' ').map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const regex = new RegExp(`(${escapedSearchTerms})`, 'gi');

        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mainfiles-container" ref={containerRef}>
            {data.length === 0 ? (
                <p>No data found</p>
            ) : (
                data.map(item => (
                    <div key={item.id} id={`file-${item.id}`} className={`file-table-container ${openFileId === item.id ? 'visible' : 'hidden'}`}>
                        <table className="file-table">
                            <tbody>
                                <tr>
                                    <th>File Name</th>
                                    <td>{item.file_name}</td>
                                    <td>
                                        <button
                                            className="toggle-button"
                                            onClick={() => toggleDetails(item.id)}
                                        >
                                            {openFileId === item.id ? '▲' : '▼'}
                                        </button>
                                    </td>
                                </tr>
                                {openFileId === item.id && (
                                    <>
                                        <tr className="details">
                                            <th>Date Time</th>
                                            <td>{item.date_time}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Transcription</th>
                                            <td dangerouslySetInnerHTML={{ __html: highlightText(item.agent_transcription, searchQuery.spokenWords) }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Translation</th>
                                            <td dangerouslySetInnerHTML={{ __html: highlightText(item.agent_translation, searchQuery.spokenWords) }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Transcription</th>
                                            <td dangerouslySetInnerHTML={{ __html: highlightText(item.customer_transcription, searchQuery.spokenWords) }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Translation</th>
                                            <td dangerouslySetInnerHTML={{ __html: highlightText(item.customer_translation, searchQuery.spokenWords) }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Sentiment Score</th>
                                            <td>{item.agent_sentiment_score}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Sentiment Score</th>
                                            <td>{item.customer_sentiment_score}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Abusive Count</th>
                                            <td>{item.abusive_count}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Contains Financial Info</th>
                                            <td>{item.contains_financial_info}</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
};

export default MainFiles;

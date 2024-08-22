// src/components/routes/MainFiles/MainFiles.js

import React, { useEffect, useState, useRef } from "react";
import "./MainFiles.css";

const MainFiles = ({ searchQuery }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openRowId, setOpenRowId] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/search-transcriptions?query=${searchQuery}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchData();
        }
    }, [searchQuery]);

    const toggleDetails = (id) => {
        if (openRowId === id) {
            setOpenRowId(null);
        } else {
            setOpenRowId(id);
            const element = document.getElementById(`file-${id}`);
            if (element && containerRef.current) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                containerRef.current.scrollTop = element.offsetTop - containerRef.current.clientHeight / 2 + element.clientHeight / 2;
            }
        }
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
                    <div key={item.id} id={`file-${item.id}`} className={`file-table-container ${openRowId === item.id ? 'visible' : 'hidden'}`}>
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
                                            {openRowId === item.id ? '▲' : '▼'}
                                        </button>
                                    </td>
                                </tr>
                                {openRowId === item.id && (
                                    <>
                                        <tr className="details">
                                            <th>Date Time</th>
                                            <td>{item.date_time}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Transcription</th>
                                            <td>{item.agent_transcription}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Translation</th>
                                            <td>{item.agent_translation}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Sentiment Score</th>
                                            <td>{item.agent_sentiment_score}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Transcription</th>
                                            <td>{item.customer_transcription}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Translation</th>
                                            <td>{item.customer_translation}</td>
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

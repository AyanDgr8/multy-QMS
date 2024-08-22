// src/components/routes/MainBody/MainBody/MainBody.js


import React, { useState } from "react";
import "./MainBody.css";

const MainBody = ({ onSearch }) => {
    const [spokenWords, setSpokenWords] = useState("");
    const [addWords, setAddWords] = useState("");
    const [timeBasis, setTimeBasis] = useState("");
    const [isAddWordsVisible, setIsAddWordsVisible] = useState(false);

    // Clear the input fields
    const handleClearClick = () => {
        setSpokenWords("");
        setAddWords("");
        setTimeBasis("");
        setIsAddWordsVisible(false); // Hide the add Words input when cleared
    };

    const handleSearchClick = () => {
        if (spokenWords.trim() !== "") {
            onSearch(spokenWords);
        }
    };

    return (
        <div>
            <div className="mainbody-container">
                <div className="mainbody-search">
                    <div className="mainb-first">
                        <div className="mainb-first-search">
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-ww" id="inputGroup-sizing-sm">
                                    Spoken Words
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-ww"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Words"
                                    value={spokenWords}
                                    onChange={(e) => setSpokenWords(e.target.value)}
                                />
                            </div>

                            {!isAddWordsVisible ? (
                                <button 
                                    type="button" 
                                    className="btn btn-secondary mb-3 clr-srch addi"
                                    onClick={() => setIsAddWordsVisible(true)}
                                >
                                    + Add Words
                                </button>
                            ) : (
                                <div className="input-group input-group-sm mb-3 sed">
                                    <span className="input-group-text phrase-word span-ww" id="inputGroup-sizing-sm">
                                        + Add Words
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control inp-ww"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm"
                                        placeholder="Add Words"
                                        value={addWords}
                                        onChange={(e) => setAddWords(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>  

                        <div className="srch-btns">
                            <button 
                                type="button" 
                                className="btn btn-primary clr-srch"
                                onClick={handleClearClick}
                            >
                                Clear 
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary clr-srch"
                                onClick={handleSearchClick}>
                                Search
                            </button>
                        </div>
                    </div>

                    {/* **************** */}

                    <div className="mainb-second">
                        <div className="input-group find-contain">
                            <span className="input-group-text text-fnd">Find Files that</span>
                            <div className="btn-group">
                                <button className="btn dropdown-toggle do-any" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    do
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">do</a></li>
                                    <li><a className="dropdown-item" href="#">do not</a></li>
                                </ul>
                            </div>
                            <span className="input-group-text text-fnd">contain</span>
                            <div className="btn-group">
                                <button className="btn dropdown-toggle do-any" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    any
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">any</a></li>
                                    <li><a className="dropdown-item" href="#">all</a></li>
                                </ul>
                            </div>
                            <span className="input-group-text text-fnd">of the Search Terms</span>
                        </div>

                        {/* Time basis section */}
                        <div className="input-group find-contain">
                            <span className="input-group-text text-fnd">Time basis</span>
                            <input
                                type="text"
                                className="form-control time"
                                value={timeBasis}
                                onChange={(e) => setTimeBasis(e.target.value)}
                            />
                            <div className="btn-group">
                                <button className="btn dropdown-toggle secs-mins" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    secs
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">secs</a></li>
                                    <li><a className="dropdown-item" href="#">mins</a></li>
                                </ul>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary clr-srch srcsec">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainBody;

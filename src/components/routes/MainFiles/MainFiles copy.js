// // src/components/routes/MainFiles/MainFiles.js

// import React, { useEffect, useState, useRef } from "react";
// import "./MainFiles.css";

// const MainFiles = ({ searchQuery }) => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [openRowId, setOpenRowId] = useState(null);
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (searchQuery) {
//                     const response = await fetch(`http://localhost:3005/api/search-translation?${searchQuery}`);
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     const result = await response.json();
//                     setData(result);
//                 } else {
//                     setData([]);
//                 }
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchData();
//     }, [searchQuery]);
    

//     const toggleDetails = (id) => {
//         if (openRowId === id) {
//             setOpenRowId(null);
//         } else {
//             setOpenRowId(id);
//             const element = document.getElementById(`file-${id}`);
//             if (element && containerRef.current) {
//                 element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//                 containerRef.current.scrollTop = element.offsetTop - containerRef.current.clientHeight / 2 + element.clientHeight / 2;
//             }
//         }
//     };

//     const highlightText = (text) => {
//         if (!searchQuery) return text;
    
//         const regex = new RegExp(`(${searchQuery})`, 'gi'); // 'gi' for case-insensitive matching
//         return text.replace(regex, '<mark>$1</mark>');
//     };
    

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="mainfiles-container" ref={containerRef}>
//             {data.length === 0 && !loading ? (
//                 <div className="blank-space">Search for files to display results.</div>
//             ) : (
//                 data.map(item => (
//                     <div key={item.id} id={`file-${item.id}`} className={`file-table-container ${openRowId === item.id ? 'visible' : 'hidden'}`}>
//                         <table className="file-table">
//                             <tbody>
//                                 <tr>
//                                     <th>File Name</th>
//                                     <td>{item.file_name}</td>
//                                     <td>
//                                         <button
//                                             className="toggle-button"
//                                             onClick={() => toggleDetails(item.id)}
//                                         >
//                                             {openRowId === item.id ? '▲' : '▼'}
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 {openRowId === item.id && (
//                                     <>
//                                         <tr className="details">
//                                             <th>Date Time</th>
//                                             <td>{item.date_time}</td>
//                                         </tr>
//                                         <tr className="details">
//                                             <th>Agent Transcription</th>
//                                             <td dangerouslySetInnerHTML={{ __html: highlightText(item.agent_transcription) }} />
//                                         </tr>
//                                         <tr className="details">
//                                             <th>Agent Translation</th>
//                                             <td>{item.agent_translation}</td>
//                                         </tr>
//                                         <tr className="details">
//                                             <th>Agent Sentiment Score</th>
//                                             <td>{item.agent_sentiment_score}</td>
//                                         </tr>
//                                         <tr className="details">
//                                             <th>Customer Transcription</th>
//                                             <td dangerouslySetInnerHTML={{ __html: highlightText(item.customer_transcription) }} />
//                                         </tr>
//                                         <tr className="details">
//                                             <th>Customer Translation</th>
//                                             <td>{item.customer_translation}</td>
//                                         </tr>
//                                         <tr className="details">
//                                             <th>Customer Sentiment Score</th>
//                                             <td>{item.customer_sentiment_score}</td>
//                                         </tr>
//                                     </>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default MainFiles;

import React from 'react';
import { Link } from 'react-router-dom';
// Ensure the component path in Home.jsx is updated to import this file

/**
 * Renders a single problem result card.
 * @param {object} problem - The problem object (title, description, difficulty, tags, _id).
 */
const SearchResultCard = ({ problem }) => {
    return (
        <div key={problem._id} className="problem-card">
            
            <div className="card-header">
                <h3>{problem.title}</h3>
                <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                </span>
            </div>

            <div className="tags-list">
                {problem.tags && problem.tags.map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                ))}
            </div>
            
            <p>{problem.description.substring(0, 100)}...</p>
            
            {/* Link to Problem Details Page */}
            <Link to={`/problems/${problem._id}`} className="view-details">
                View Full Problem →
            </Link>
        </div>
    );
};

export default SearchResultCard;
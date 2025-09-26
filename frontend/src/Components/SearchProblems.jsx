import React, { useState } from 'react';
// Assuming you'll create a CSS file for styling
import './SearchProblems.css'; 

/**
 * SearchProblems component renders the search bar and handles user input.
 * It expects 'onSearch' and 'loading' props from the parent (Home.jsx).
 */
const SearchProblems = ({ onSearch, loading }) => {
    // Local state to store the text the user types
    const [query, setQuery] = useState('');

    // Handle form submission (when the button is clicked or Enter is pressed)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission/page reload
        if (query.trim()) {
            // Call the search function provided by the parent (Home.jsx's handleSearch)
            onSearch(query);
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-input-group">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter a problem description (e.g., time complexity of merge sort...)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading} // Disable input while search is loading
                />
                
                <button 
                    type="submit" 
                    className="search-button"
                    disabled={loading || !query.trim()} // Disable button if loading or query is empty
                >
                    {/* Display a spinner/loading text while search is active */}
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            
            {/* Optional: Add a small error message for empty search */}
            {!query.trim() && !loading && (
                <p className="search-tip">Please enter a query to search for similar problems.</p>
            )}
        </form>
    );
};

export default SearchProblems;
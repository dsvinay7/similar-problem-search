import React, { useState } from 'react';
import './SearchProblems.css'; 
// Assuming a clear icon is either imported (like from lucide-react) or a placeholder is used

const SearchProblems = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Input Validation: Prevent searching if the query is only whitespace
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
        // Optional: Trigger an empty search to clear displayed results immediately
        onSearch(''); 
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
                    disabled={loading}
                />
                
                {/* Clear Button */}
                {query && !loading && (
                    <button 
                        type="button" 
                        className="clear-button"
                        onClick={handleClear}
                    >
                        &times; {/* Simple 'x' character for clear */}
                    </button>
                )}

                <button 
                    type="submit" 
                    className="search-button"
                    disabled={loading || !query.trim()}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            
            {!query.trim() && !loading && (
                <p className="search-tip">Please enter a query to search for similar problems.</p>
            )}
        </form>
    );
};

export default SearchProblems;
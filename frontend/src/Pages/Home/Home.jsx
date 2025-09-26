import React, { useState } from 'react';
import SearchProblems from '../Components/SearchProblems'; // Assuming the component path
import './Home.css'; // You'll create this file for styling

const HomePage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // This function will be passed down to SearchProblems.jsx
    const handleSearch = async (query) => {
        if (!query.trim()) return;

        setLoading(true);
        setSearchResults([]); // Clear previous results

        try {
            // Placeholder: Replace with your actual API call using utils/http.js
            const response = await fetch(`/api/problems/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            // Assuming the API returns an array of problem objects in data.problems
            setSearchResults(data.problems || []);

        } catch (error) {
            console.error("Search failed:", error);
            setSearchResults([]);
            // You might want to show an error message to the user here
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page-container">
            {/* Header Section (Simple for now) */}
            <header className="home-header">
                <h1>Problem Solver AI</h1>
                <nav>
                    {/* Placeholder for navigation links */}
                    <a href="#features">Features</a>
                    <a href="/login">Login</a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="main-title">Find Your Solution Faster.</h1>
                    <p className="subtitle">
                        Instantly search for similar problems, solutions, and concepts using **AI-powered keyword and semantic search.**
                    </p>

                    {/* The Core Search Component */}
                    <div className="search-widget">
                        <SearchProblems 
                            onSearch={handleSearch} 
                            loading={loading}
                        />
                    </div>
                    
                    {/* Display Results or Loading Status */}
                    <div className="search-results-display">
                        {loading && <p>Searching...</p>}
                        
                        {!loading && searchResults.length > 0 && (
                            <div className="results-list">
                                <h2>Found {searchResults.length} Similar Problems:</h2>
                                {searchResults.map((problem) => (
                                    <div key={problem._id} className="problem-card">
                                        <h3>{problem.title}</h3>
                                        <p>{problem.description.substring(0, 150)}...</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {!loading && searchResults.length === 0 && (
                             <p className="no-results-text">Enter a query above to begin your intelligent search.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <h2>Why Use Problem Solver AI?</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <span className="feature-icon">🔍</span>
                        <h3>Keyword Match (Phase 1)</h3>
                        <p>Fast and accurate matching using standard keywords and phrases.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🧠</span>
                        <h3>Conceptual Search (Phase 2)</h3>
                        <p>Semantic AI understands the meaning of your problem, not just the words.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">⚡</span>
                        <h3>Hybrid Results (Phase 3)</h3>
                        <p>Combines relevance with conceptual understanding for the best possible results.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
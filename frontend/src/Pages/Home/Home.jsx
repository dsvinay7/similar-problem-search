import React, { useState } from 'react';
import SearchProblems from '../../Components/SearchProblems'; 
import SearchResultCard from '../../Components/SearchResultCard'; 
import './Home.css'; 

const HomePage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            localStorage.removeItem('last_search_attempt'); // Reset status if input is cleared
            return;
        }

        setLoading(true);
        setSearchResults([]);

        try {
            // --- DATA MOCKING FOR FRONTEND ---
            const MOCK_RESULTS = [
                { _id: 1, title: "Longest Increasing Subsequence", description: "Find the length of the longest strictly increasing subsequence.", difficulty: "Hard", tags: ["DP", "Binary Search"] },
                { _id: 2, title: "Maximum Subarray Sum", description: "Find the contiguous subarray which has the largest sum.", difficulty: "Medium", tags: ["DP", "Arrays"] },
                { _id: 3, title: "Two Sum", description: "Return indices of two numbers that add up to a target.", difficulty: "Easy", tags: ["Arrays", "Hash Table"] },
            ];

            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading time

            const data = { problems: MOCK_RESULTS.filter(p => 
                p.title.toLowerCase().includes(query.toLowerCase()) || 
                p.description.toLowerCase().includes(query.toLowerCase())
            )};

            setSearchResults(data.problems);
            localStorage.setItem('last_search_attempt', 'true'); 

        } catch (error) {
            console.error("Search failed:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page-container">
            {/* Header is rendered in App.jsx */}

            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="main-title">Find Your Solution Faster.</h1>
                    <p className="subtitle">
                        Instantly search for similar problems, solutions, and concepts using **AI-powered keyword and semantic search.**
                    </p>

                    <div className="search-widget">
                        <SearchProblems 
                            onSearch={handleSearch} 
                            loading={loading}
                        />
                    </div>
                    
                    {/* Display Results or Loading Status */}
                    <div className="search-results-display">
                        {loading && <p className="loading-message">Searching for similar problems...</p>}
                        
                        {!loading && searchResults.length > 0 && (
                            <div className="results-list">
                                <h2>Found {searchResults.length} Similar Problems:</h2>
                                
                                {/* Uses the dedicated component for clean mapping */}
                                {searchResults.map((problem) => (
                                    <SearchResultCard key={problem._id} problem={problem} />
                                ))}
                            </div>
                        )}
                        
                        {!loading && searchResults.length === 0 && (
                            <p className="no-results-text">
                                { /* Show failure message only after a search attempt */
                                    (localStorage.getItem('last_search_attempt') && !loading) 
                                        ? "Sorry, no similar problems were found matching your query."
                                        : "Enter a query above to begin your intelligent search."
                                }
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section (rest of the page is the same) */}
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
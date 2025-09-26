import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import './ProblemDetails.css'; // Don't forget to create this CSS file!

const MOCK_PROBLEM_DATA = {
    _id: "660c2d3c905c93c138b72e50",
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    description: `
        Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. 
        A subarray is a contiguous part of an array.
        
        Example 1:
        Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
        Output: 6
        Explanation: The contiguous subarray [4,-1,2,1] has the largest sum = 6.
        
        Constraints:
        1 <= nums.length <= 10^5
        -10^4 <= nums[i] <= 10^4
    `,
    difficulty: "Medium",
    tags: ["Dynamic Programming", "Arrays", "Algorithms"],
    solution_link: "#solution" // Placeholder link
};

const ProblemDetails = () => {
    const { problemId } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // MOCKING LOGIC: Simulates fetching data by ID
        const fetchProblemDetails = () => {
            setLoading(true);
            setTimeout(() => {
                setProblem(MOCK_PROBLEM_DATA);
                setLoading(false);
            }, 800); 
        };

        fetchProblemDetails();
    }, [problemId]);

    if (loading) {
        return <div className="details-container">Loading problem details...</div>;
    }

    if (!problem) {
        return <div className="details-container">Problem not found.</div>;
    }

    return (
        <div className="details-container">
            <Link to="/" className="back-link">← Back to Search</Link>
            
            <header className="problem-header">
                <h1>{problem.title}</h1>
                {/* Apply difficulty class for styling (e.g., .difficulty.medium) */}
                <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                </span>
            </header>
            
            <div className="tags-list">
                {problem.tags.map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                ))}
            </div>
            
            <div className="problem-content">
                <h2>Problem Description</h2>
                {/* Use <pre> to maintain formatting (line breaks) from the string */}
                <pre className="description-text">{problem.description}</pre>
            </div>

            <a href={problem.solution_link || '#'} className="solution-link">View Solution</a>
        </div>
    );
};

export default ProblemDetails;
import React, { useState } from 'react';
import '../styles/ChatArea.css';

const WelcomeArea = ({ username, onSendPrompt }) => {
    const [prompt, setPrompt] = useState("");

    const handleSend = () => {
        if (prompt.trim()) {
            onSendPrompt(prompt);
        }
    };

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome, {username || "User"}!</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    className="chat-input" 
                    placeholder="Create something with GuruAI..." 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleSend() }}
                />
                <button className="send-btn" onClick={handleSend} aria-label="Send Message">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default WelcomeArea;

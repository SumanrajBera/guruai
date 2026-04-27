import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatArea.css';

const ChatArea = ({ messages, isAITyping, onSendMessage }) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isAITyping]);

    const handleSend = () => {
        if (input.trim() && !isAITyping) {
            onSendMessage(input);
            setInput("");
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-area">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message-wrapper ${msg.sender === 'user' ? 'us' : 'ai'}`}>
                        <div className="message-sender">{msg.sender === 'user' ? 'You' : 'GuruAI'}</div>
                        <div className={`message ${msg.sender === 'user' ? 'us' : 'ai'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {isAITyping && (
                    <div className="message-wrapper ai">
                        <div className="message-sender">GuruAI</div>
                        <div className="typing-indicator">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-wrapper">
                <div className="input-container">
                    <input 
                        type="text" 
                        className="chat-input" 
                        placeholder={isAITyping ? "GuruAI is typing..." : "Message GuruAI..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') handleSend() }}
                        disabled={isAITyping}
                    />
                    <button className="send-btn" onClick={handleSend} disabled={isAITyping || !input.trim()}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;

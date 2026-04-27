import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, onClose, onNewChat, history }) => {
    return (
        <>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="new-chat-btn" onClick={onNewChat}>
                    <span>+</span> New Chat
                </button>
                <div className="history-section">
                    <div style={{ padding: '0 12px', fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', fontWeight: 'bold', marginBottom: '8px' }}>
                        History
                    </div>
                    {history.map((item) => (
                        <div key={item.id} className="history-item">
                            {item.title}
                        </div>
                    ))}
                    {history.length === 0 && (
                        <div style={{ padding: '0 12px', fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
                            No past conversions.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;

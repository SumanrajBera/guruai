import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import { useSelector } from 'react-redux';
import useAuth from '../../Auth/hooks/auth';

const Sidebar = ({ isOpen, onClose, onNewChat, isFetchingConv }) => {
    const { logout } = useAuth()
    const [isDark, setIsDark] = useState(false);
    const history = useSelector(state => state.conv.history)
    const historyArray = Object.values(history)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        setIsDark(currentTheme === 'dark');
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleLogout = () => {
        logout()
    };

    return (
        <>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 16C17.6569 16 19 17.3431 19 19C19 20.6569 17.6569 22 16 22C14.3431 22 13 20.6569 13 19C13 17.3431 14.3431 16 16 16ZM6 12C8.20914 12 10 13.7909 10 16C10 18.2091 8.20914 20 6 20C3.79086 20 2 18.2091 2 16C2 13.7909 3.79086 12 6 12ZM14.5 2C17.5376 2 20 4.46243 20 7.5C20 10.5376 17.5376 13 14.5 13C11.4624 13 9 10.5376 9 7.5C9 4.46243 11.4624 2 14.5 2Z"></path></svg>
                    <span>GuruAI</span>
                </div>

                <div className="sidebar-layout">
                    <div className="sidebar-new-chat">
                        <button className="new-chat-btn" onClick={onNewChat}>
                            <span>+</span> New Chat
                        </button>
                    </div>

                    <div className="sidebar-history">
                        <div className="section-title">History</div>
                        {
                            isFetchingConv ? <div className="history-list">
                                Loading...
                            </div> :
                                <div className="history-list">
                                    {historyArray.map((item) => (
                                        <div key={item._id} className="history-item">
                                            {item.title}
                                        </div>
                                    ))}
                                    {historyArray.length === 0 && (
                                        <div className="history-empty">No past conversions.</div>
                                    )}
                                </div>
                        }
                        {/* <div className="history-list">
                            {historyArray.map((item) => (
                                <div key={item.id} className="history-item">
                                    {item.title}
                                </div>
                            ))}
                            {history.length === 0 && (
                                <div className="history-empty">No past conversions.</div>
                            )}
                        </div> */}
                    </div>

                    <div className="sidebar-settings">
                        <div className="section-title">Settings</div>
                        <button className="settings-btn" onClick={toggleTheme}>
                            {isDark ? <><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path></svg> <span>Light Mode</span></> :
                                <><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path></svg><span>Dark Mode</span></>}
                        </button>
                        <button className="settings-btn logout-btn" onClick={handleLogout}>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                            <span>
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
